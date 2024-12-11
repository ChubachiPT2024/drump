import { Card } from "../models/cards/card";

/**
 * カードサービス
 */
export class CardsService {
  // TODO Card[] ではなく、ファーストクラスコレクションを作成して、そのクラスのメソッドとして実装する方法もあるかも
  /**
   * カードをシャッフルする
   *
   * @param cards カード
   * @see {@link https://ja.javascript.info/task/shuffle}
   */
  public suffle(cards: Card[]): void {
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // 0 から i のランダムなインデックス
      [cards[i], cards[j]] = [cards[j], cards[i]]; // 要素を入れ替えます
    }
  }
}
