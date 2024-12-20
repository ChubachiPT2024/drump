import { Card } from "../cards/card";
import { ShoeId } from "./shoeId";

/**
 * シュー
 */
export class Shoe {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param cards カード
   */
  public constructor(
    public readonly id: ShoeId,
    private cards: Card[],
  ) {}

  /**
   * 次にドローするカードを返す
   *
   * @returns 次にドローするカード
   */
  public peek(): Card {
    if (this.cards[0] === undefined) {
      throw new Error("Shoe is empty.");
    }
    return this.cards[0];
  }

  /**
   * カードをドローする
   */
  public draw(): void {
    this.cards = [...this.cards.slice(1)];
  }
}
