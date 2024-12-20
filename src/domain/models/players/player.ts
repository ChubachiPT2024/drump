import { Card } from "../cards/card";
import { ChipAmount } from "../chipAmounts/chipAmount";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
import { UserId } from "../users/userId";
import { PlayerId } from "./playerId";
import { PlayerNotification } from "./playerNotification";

/**
 * プレイヤー
 */
export class Player {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param userId ユーザ ID
   * @param credit クレジット
   * @param bet ベット
   * @param hand ハンド
   */
  private constructor(
    public readonly id: PlayerId,
    public readonly userId: UserId,
    private credit: ChipAmount,
    private bet: ChipAmount,
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
    // TODO クレジットの初期値
    return new Player(
      id,
      userId,
      new ChipAmount(50000),
      new ChipAmount(0),
      Hand.create(),
    );
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
   * ベットを取得する
   *
   * @returns ベット
   */
  public getBet(): ChipAmount {
    return this.bet;
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
   * 通知する
   *
   * @param notification 通知
   */
  public notify(notification: PlayerNotification) {
    notification.notifyId(this.id);
    notification.notifyHand(this.hand);
    notification.notifyHandSignalOptions(this.getHandSignalOptions());
  }
}
