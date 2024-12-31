import { ChipAmount } from "../chipAmounts/chipAmount";
import { Dealer } from "../dealers/dealer";
import { Player } from "../players/player";
import { PlayerId } from "../players/playerId";
import { RoundCount } from "../roundCounts/roundCount";
import { RoundHistory } from "../roundHistories/roundHistory";
import { RoundPlayerHistory } from "../roundHistories/roundPlayerHistory";
import { RoundResult } from "../roundResultCalculators/roundResult";
import { RoundResultCalculator } from "../roundResultCalculators/roundResultCalculator";
import { Shoe } from "../shoes/shoe";
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
   * @param amount 額
   */
  public bet(amount: ChipAmount): void {
    // TODO 複数プレイヤー対応
    this.players[0].bet(amount);
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
   * プレイヤーにカードを配る
   */
  public dealCardToPlayer(): void {
    // TODO 複数プレイヤー対応
    this.players[0].addCardToHand(this.shoe.peek());

    // TODO シューをエンティティにするかどうか
    this.shoe = this.shoe.draw();
  }

  /**
   * ヒットできるかどうかを取得する
   *
   * @returns ヒットできるかどうか
   */
  public canHit(): boolean {
    // TODO 複数プレイヤー対応
    return this.players[0].getHand().canHit();
  }

  /**
   * スタンドする
   */
  public stand(): void {
    // TODO 複数プレイヤー対応
    return this.players[0].stand();
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
    this.settleRound();

    // TODO 複数プレイヤー対応
    this.roundHistories.push(
      new RoundHistory(
        this.roundCount,
        this.dealer.getHand(),
        new RoundPlayerHistory(
          this.calculateRoundResult(),
          this.players[0].getCredit(),
        ),
      ),
    );

    // TODO 複数プレイヤー対応
    this.dealer.discard();
    this.players[0].discard();
  }

  // TODO テストを書けていないので修正の余地あり
  /**
   * ラウンドの清算処理を実行する
   */
  public settleRound(): void {
    // TODO 複数プレイヤー対応
    switch (this.calculateRoundResult()) {
      case RoundResult.Win:
        this.players[0].collectPayoff(this.calculatePayoff());
        this.players[0].collectBet();
        break;
      case RoundResult.Push:
        this.players[0].collectBet();
        break;
      case RoundResult.Loss:
        this.players[0].loseBet();
        break;
    }
  }

  /**
   * ラウンドの結果を計算する
   *
   * @returns ラウンドの結果
   */
  private calculateRoundResult(): RoundResult {
    // TODO 複数プレイヤー対応
    return this.roundResultCalculator.calculate(
      this.players[0].getHand(),
      this.dealer.getHand(),
    );
  }

  /**
   * ペイオフを計算する
   *
   * @returns ペイオフ
   */
  private calculatePayoff(): ChipAmount {
    // TODO 複数プレイヤー対応
    const rate = this.players[0].getHand().isBlackJack() ? 1.5 : 1;
    return this.players[0].getBetAmount().multiplyAndCeil(rate);
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
   * 通知する
   *
   * @param notification 通知
   */
  public notify(notification: MatchNotification): void {
    notification.notifyId(this.id);
    notification.notifyDealer(this.dealer);
    // TODO 複数プレイヤー対応
    notification.notifyPlayer(this.players[0]);
    notification.notifyRoundCount(this.roundCount);
  }
}
