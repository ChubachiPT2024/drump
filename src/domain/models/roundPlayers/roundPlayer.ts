import { Card } from "../cards/card";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";

/**
 * ラウンドのプレイヤー
 */
export class RoundPlayer {
  /**
   * コンストラクタ
   *
   * @param hand ハンド
   */
  private constructor(private hand: Hand) {}

  /**
   * インスタンスを生成する
   *
   * @returns インスタンス
   */
  public static create(): RoundPlayer {
    return new RoundPlayer(Hand.create());
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
}
