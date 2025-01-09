import { BasicStrategyCalculator } from "../basicStrategyCalculators/basicStrategyCalculator";
import { ChipAmount } from "../chipAmounts/chipAmount";
import { Dealer } from "../dealers/dealer";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
import { Player } from "../players/player";
import { PlayerId } from "../players/playerId";
import { RoundCount } from "../roundCounts/roundCount";
import { RoundHistory } from "../roundHistories/roundHistory";
import { RoundPlayerHistory } from "../roundHistories/roundPlayerHistory";
import { RoundResult } from "../roundResultCalculators/roundResult";
import { RoundResultCalculator } from "../roundResultCalculators/roundResultCalculator";
import { Shoe } from "../shoes/shoe";
import { UserId } from "../users/userId";
import { MatchCannotHitError } from "./matchCannotHitError";
import { MatchId } from "./matchId";
import { MatchNotification } from "./matchNotification";
import { MatchPlayerNotFoundError } from "./matchPlayerNotFoundError";

/**
 * 試合
 */
export class Match {
  /**
   * デッキ数
   */
  private static readonly NUMBER_OF_DECKS = 6;

  /**
   * コンストラクタ
   *
   * @param id ID
   * @param shoe シュー
   * @param dealer ディーラー
   * @param players プレイヤー
   * @param roundCount ラウンド数
   * @param roundResultCalculator ラウンド結果計算機
   * @param roundHistories ラウンド履歴
   */
  private constructor(
    public readonly id: MatchId,
    private shoe: Shoe,
    private readonly dealer: Dealer,
    private readonly players: Player[],
    private roundCount: RoundCount,
    private readonly roundResultCalculator: RoundResultCalculator,
    private readonly roundHistories: RoundHistory[],
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param dealer ディーラー
   * @param players プレイヤー
   * @returns インスタンス
   */
  public static create(id: MatchId, dealer: Dealer, players: Player[]) {
    return new Match(
      id,
      Shoe.createFromDecks(this.NUMBER_OF_DECKS).suffle(),
      dealer,
      players,
      RoundCount.ZERO,
      new RoundResultCalculator(),
      [],
    );
  }

  /**
   * ラウンドを開始する
   */
  public startRound(): void {
    this.roundCount = this.roundCount.increment();

    for (let i = 0; i < 2; i++) {
      this.dealCardToDealer();
    }

    for (const player of this.players) {
      for (let i = 0; i < 2; i++) {
        player.addCardToHand(this.shoe.peek());
        this.shoe = this.shoe.draw();
      }
    }
  }

  /**
   * ベットする
   *
   * @param playerId プレイヤー ID
   * @param amount 額
   */
  public bet(playerId: PlayerId, amount: ChipAmount): void {
    this.getPlayer(playerId).bet(amount);
  }

  /**
   * ディーラーにカードを配る
   */
  public dealCardToDealer(): void {
    this.dealer.addCardToHand(this.shoe.peek());

    // TODO シューをエンティティにするかどうか
    this.shoe = this.shoe.draw();
  }

  /**
   * ヒットする
   *
   * @param playerId プレイヤー ID
   */
  public hit(playerId: PlayerId): void {
    const player = this.getPlayer(playerId);
    if (!player.getHand().canHit()) {
      throw new MatchCannotHitError();
    }

    player.addCardToHand(this.shoe.peek());
    this.shoe = this.shoe.draw();
  }

  /**
   * スタンドする
   *
   * @param playerId プレイヤー ID
   */
  public stand(playerId: PlayerId): void {
    return this.getPlayer(playerId).stand();
  }

  // TODO テストを書けていないので修正の余地あり
  /**
   * ディーラーのハンドを解決する
   */
  public resolveDealersHand(): void {
    while (this.dealer.shouldHit()) {
      this.dealCardToDealer();
    }

    if (!this.dealer.getHand().isResolved()) {
      this.dealer.stand();
    }
  }

  /**
   * ラウンドを完了する
   */
  public completeRound(): void {
    this.resolveDealersHand();

    for (const player of this.players) {
      this.settleRound(player.id);
    }

    this.roundHistories.push(
      new RoundHistory(
        this.roundCount,
        this.dealer.getHand(),
        this.players.map(
          (player) =>
            new RoundPlayerHistory(
              player.id,
              this.calculateRoundResult(player.id),
              player.getCredit(),
            ),
        ),
      ),
    );

    this.dealer.discard();
    for (const player of this.players) {
      player.discard();
    }
  }

  // TODO テストを書けていないので修正の余地あり
  /**
   * ラウンドの清算処理を実行する
   *
   * @param playerId プレイヤー ID
   */
  public settleRound(playerId: PlayerId): void {
    const player = this.getPlayer(playerId);
    switch (this.calculateRoundResult(playerId)) {
      case RoundResult.Win:
        player.collectPayoff(
          Match.calculatePayoff(player.getHand(), player.getBetAmount()),
        );
        player.collectBet();
        break;
      case RoundResult.Push:
        player.collectBet();
        break;
      case RoundResult.Loss:
        player.loseBet();
        break;
    }
  }

  /**
   * ラウンドの結果を計算する
   *
   * @param playerId プレイヤー ID
   * @returns ラウンドの結果
   */
  private calculateRoundResult(playerId: PlayerId): RoundResult {
    return this.roundResultCalculator.calculate(
      this.getPlayer(playerId).getHand(),
      this.dealer.getHand(),
    );
  }

  // TODO 別クラスに定義できる可能性あり
  /**
   * ペイオフを計算する
   *
   * @param hand ハンド
   * @param betAmount ベット額
   * @returns ペイオフ
   */
  private static calculatePayoff(
    hand: Hand,
    betAmount: ChipAmount,
  ): ChipAmount {
    const rate = hand.isBlackJack() ? 1.5 : 1;
    return betAmount.multiplyAndCeil(rate);
  }

  /**
   * ラウンド数を取得する
   *
   * @returns ラウンド数
   */
  public getRoundCount(): RoundCount {
    return this.roundCount;
  }

  /**
   * ラウンド履歴を取得する
   *
   * @returns ラウンド履歴
   */
  public getRoundHistories(): RoundHistory[] {
    return [...this.roundHistories];
  }

  /**
   * 試合が完了しているかどうかを判定する
   *
   * @returns 試合が完了しているかどうかを
   */
  public isCompleted(): boolean {
    return this.roundHistories.length === RoundCount.MAX_ROUND_COUNT;
  }

  /**
   * プレイヤーを取得する
   *
   * @param playerId プレイヤー ID
   * @returns プレイヤー
   */
  private getPlayer(playerId: PlayerId): Player {
    const player = this.players.find(
      (player) => player.id.value === playerId.value,
    );
    if (!player) {
      throw new MatchPlayerNotFoundError();
    }

    return player;
  }

  /**
   * プレイヤー ID リストを取得する
   *
   * @returns プレイヤー ID リスト
   */
  public getPlayerIds(): PlayerId[] {
    return this.players.map((player) => player.id);
  }

  /**
   * ベーシックストラテジーを計算する
   *
   * @param playerId プレイヤー ID
   * @returns ベーシックストラテジー
   */
  public calculateBasicStrategy(playerId: PlayerId): HandSignal {
    return BasicStrategyCalculator.calculate(
      this.getPlayer(playerId).getHand(),
      this.dealer.getUpCard(),
    );
  }

  /**
   * 指定されたプレイヤーのユーザ ID を取得する
   *
   * @param playerId プレイヤー ID
   * @returns ユーザ ID
   */
  public getUserId(playerId: PlayerId): UserId {
    return this.getPlayer(playerId).userId;
  }

  /**
   * 通知する
   *
   * @param notification 通知
   */
  public notify(notification: MatchNotification): void {
    notification.notifyId(this.id);
    notification.notifyDealer(this.dealer);
    notification.notifyPlayers(this.players);
    notification.notifyRoundCount(this.roundCount);
    notification.notifyIsCompleted(this.isCompleted());
  }
}
