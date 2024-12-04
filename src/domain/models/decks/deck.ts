import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";

/**
 * デッキ
 */
export class Deck {
  /**
   * コンストラクタ
   * 
   * @param cards カード
   */
  private constructor(private readonly cards: Card[]) {
  }

  /**
   * デッキを生成する
   * 
   * @returns デッキ
   */
  public static create(): Deck {
    const cards = []
    for (const suit of Object.values(Suit)) {
      for (const rank of Object.values(Rank)) {
        cards.push(new Card(rank, suit))
      }
    }
    return new Deck(cards)
  }

  /**
   * デッキの全カードを取得する
   * 
   * @returns デッキの全カード
   */
  public getCards(): Card[] {
    return [...this.cards]
  }
}
