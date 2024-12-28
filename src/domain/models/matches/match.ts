import { ChipAmount } from "../chipAmounts/chipAmount";
import { Dealer } from "../dealers/dealer";
import { Player } from "../players/player";
import { RoundCount } from "../roundCounts/roundCount";
import { RoundHistory } from "../roundHistories/roundHistory";
import { RoundPlayerHistory } from "../roundHistories/roundPlayerHistory";
import { RoundResult } from "../roundResultCalculators/roundResult";
import { RoundResultCalculator } from "../roundResultCalculators/roundResultCalculator";
import { Shoe } from "../shoes/shoe";
import { MatchId } from "./matchId";
import { MatchNotification } from "./matchNotification";

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
   * @param player プレイヤー
   * @param roundCount ラウンド数
   * @param roundResultCalculator ラウンド結果計算機
   * @param roundHistories ラウンド履歴
   */
  private constructor(
    public readonly id: MatchId,
    private shoe: Shoe,
    private readonly dealer: Dealer,
    private readonly player: Player,
    private roundCount: RoundCount,
    private readonly roundResultCalculator: RoundResultCalculator,
    private readonly roundHistories: RoundHistory[],
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param dealer ディーラー
   * @param player プレイヤー
   * @returns インスタンス
   */
  public static create(id: MatchId, dealer: Dealer, player: Player) {
    return new Match(
      id,
      Shoe.createFromDecks(this.NUMBER_OF_DECKS).suffle(),
      dealer,
      player,
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

    for (let i = 0; i < 2; i++) {
      this.dealCardToPlayer();
    }
  }

  /**
   * ベットする
   *
   * @param amount 額
   */
  public bet(amount: ChipAmount): void {
    this.player.bet(amount);
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
    this.player.addCardToHand(this.shoe.peek());

    // TODO シューをエンティティにするかどうか
    this.shoe = this.shoe.draw();
  }

  /**
   * ヒットできるかどうかを取得する
   *
   * @returns ヒットできるかどうか
   */
  public canHit(): boolean {
    return this.player.getHand().canHit();
  }

  /**
   * スタンドする
   */
  public stand(): void {
    return this.player.stand();
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

    this.roundHistories.push(
      new RoundHistory(
        this.roundCount,
        new RoundPlayerHistory(
          this.calculateRoundResult(),
          this.player.getCredit(),
        ),
      ),
    );
  }

  // TODO テストを書けていないので修正の余地あり
  /**
   * ラウンドの清算処理を実行する
   */
  public settleRound(): void {
    switch (this.calculateRoundResult()) {
      case RoundResult.Win:
        this.player.collectPayoff(this.calculatePayoff());
        this.player.collectBet();
        break;
      case RoundResult.Push:
        this.player.collectBet();
        break;
      case RoundResult.Loss:
        this.player.loseBet();
        break;
    }
  }

  /**
   * ラウンドの結果を計算する
   *
   * @returns ラウンドの結果
   */
  private calculateRoundResult(): RoundResult {
    return this.roundResultCalculator.calculate(
      this.player.getHand(),
      this.dealer.getHand(),
    );
  }

  /**
   * ペイオフを計算する
   *
   * @returns ペイオフ
   */
  private calculatePayoff(): ChipAmount {
    const rate = this.player.getHand().isBlackJack() ? 1.5 : 1;
    return this.player.getBetAmount().multiplyAndCeil(rate);
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
   * 通知する
   *
   * @param notification 通知
   */
  public notify(notification: MatchNotification): void {
    notification.notifyId(this.id);
    notification.notifyDealer(this.dealer);
    notification.notifyPlayer(this.player);
    notification.notifyRoundCount(this.roundCount);
  }
}
