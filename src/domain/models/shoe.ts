import { Card } from "./card";

/**
 * シュー
 */
export class Shoe {
  /**
   * コンストラクタ
   * 
   * @param cards カード
   */
  public constructor(private readonly cards: Card[]) {
  }

  /**
   * 次にドローするカードを返す
   * 
   * @returns 次にドローするカード
   */
  public peek(): Card {
    if (this.cards[0] === undefined) {
      throw new Error("Shoe is empty.")
    }
    return this.cards[0];
  }

  /**
   * カードをドローした新しいシューを返す
   * 
   * @returns カードをドローした新しいシュー
   */
  public draw(): Shoe {
    return new Shoe([...this.cards.slice(1)])
  }
}
