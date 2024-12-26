import { Card } from "../cards/card";
import { Deck } from "../decks/deck";

/**
 * シュー
 */
export class Shoe {
  /**
   * コンストラクタ
   *
   * @param cards カード
   */
  private constructor(private readonly cards: Card[]) {}

  /**
   * デッキからシューを生成する
   *
   * @param numberOfDecks デッキ数
   */
  public static createFromDecks(numberOfDecks: number): Shoe {
    const cards = [];
    for (let i = 0; i < numberOfDecks; i++) {
      cards.push(...Deck.create().getCards());
    }

    return new Shoe(cards);
  }

  /**
   * カードをシャッフルした新しいシューを生成する
   *
   * @param cards カード
   * @returns シュー
   * @see {@link https://ja.javascript.info/task/shuffle}
   */
  public suffle(): Shoe {
    const cards = [...this.cards];

    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // 0 から i のランダムなインデックス
      [cards[i], cards[j]] = [cards[j], cards[i]]; // 要素を入れ替えます
    }

    return new Shoe(cards);
  }

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
   * カードをドローした新しいシューを返す
   *
   * @returns カードをドローした新しいシュー
   */
  public draw(): Shoe {
    return new Shoe([...this.cards.slice(1)]);
  }
}
