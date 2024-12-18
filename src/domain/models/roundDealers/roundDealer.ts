import { Card } from "../cards/card";
import { Hand } from "../hands/hand";

/**
 * ラウンドのディーラー
 */
export class RoundDealer {
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
  public static create(): RoundDealer {
    return new RoundDealer(new Hand([], false));
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
   * スタンドする
   */
  public stand(): void {
    this.hand = this.hand.stand();
  }

  /**
   * アップカードを取得する
   *
   * @returns アップカード
   */
  public getUpCard(): Card {
    return this.hand.getCards()[0];
  }

  /**
   * ヒットしなければならないかどうかを取得する
   *
   * @returns ヒットしなければならないかどうか
   */
  public shouldHit(): boolean {
    return this.hand.calculateTotal() < 17;
  }
}
