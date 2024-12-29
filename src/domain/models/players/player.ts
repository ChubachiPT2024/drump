import { Card } from "../cards/card";
import { ChipAmount } from "../chipAmounts/chipAmount";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
import { UserId } from "../users/userId";
import { PlayerCreditShortageError } from "./playerCreditShortageError";
import { PlayerId } from "./playerId";
import { PlayerNotification } from "./playerNotification";

/**
 * プレイヤー
 */
export class Player {
  /**
   * クレジットの初期値
   */
  private static readonly INITIAL_CREDIT = new ChipAmount(50000);

  /**
   * コンストラクタ
   *
   * @param id ID
   * @param userId ユーザ ID
   * @param credit クレジット
   * @param betAmount ベット額
   * @param hand ハンド
   */
  private constructor(
    public readonly id: PlayerId,
    public readonly userId: UserId,
    private credit: ChipAmount,
    private betAmount: ChipAmount,
    private hand: Hand,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param userId ユーザ ID
   * @returns インスタンス
   */
  public static create(id: PlayerId, userId: UserId): Player {
    return new Player(
      id,
      userId,
      this.INITIAL_CREDIT,
      new ChipAmount(0),
      Hand.create(),
    );
  }

  /**
   * ハンドにカードを加える
   *
   * @param card カード
   */
  public addCardToHand(card: Card): void {
    this.hand = this.hand.add(card);
  }

  /**
   * ハンドを取得する
   *
   * @returns ハンド
   */
  public getHand(): Hand {
    return this.hand;
  }

  /**
   * ハンドシグナルの選択肢を取得する
   *
   * @returns ハンドシグナルの選択肢
   */
  public getHandSignalOptions(): HandSignal[] {
    if (this.hand.isResolved()) {
      return [];
    }

    return [HandSignal.Hit, HandSignal.Stand];
  }

  /**
   * スタンドする
   */
  public stand(): void {
    this.hand = this.hand.stand();
  }

  /**
   * クレジットを取得する
   *
   * @returns クレジット
   */
  public getCredit(): ChipAmount {
    return this.credit;
  }

  /**
   * ベット額を取得する
   *
   * @returns ベット額
   */
  public getBetAmount(): ChipAmount {
    return this.betAmount;
  }

  /**
   * ベットする
   *
   * @param amount 額
   */
  public bet(amount: ChipAmount): void {
    if (!this.credit.canMinus(amount)) {
      throw new PlayerCreditShortageError();
    }

    this.credit = this.credit.minus(amount);
    this.betAmount = this.betAmount.plus(amount);
  }

  /**
   * ペイオフを回収する
   *
   * @param amount 額
   */
  public collectPayoff(amount: ChipAmount): void {
    this.credit = this.credit.plus(amount);
  }

  /**
   * ベットしたチップを回収する
   */
  public collectBet(): void {
    this.credit = this.credit.plus(this.betAmount);
    this.betAmount = new ChipAmount(0);
  }

  /**
   * ベットしたチップを失う
   */
  public loseBet(): void {
    this.betAmount = new ChipAmount(0);
  }

  /**
   * ハンドを捨てる
   */
  public discard(): void {
    this.hand = Hand.create();
  }

  /**
   * 通知する
   *
   * @param notification 通知
   */
  public notify(notification: PlayerNotification) {
    notification.notifyId(this.id);
    notification.notifyHand(this.hand);
    notification.notifyHandSignalOptions(this.getHandSignalOptions());
    notification.notifyCredit(this.credit);
    notification.notifyBetAmount(this.betAmount);
  }
}
