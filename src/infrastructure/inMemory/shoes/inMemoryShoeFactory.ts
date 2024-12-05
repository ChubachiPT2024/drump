import { Card } from "@/domain/models/cards/card";
import { Shoe } from "@/domain/models/shoes/shoe";
import { ShoeFactory } from "@/domain/models/shoes/shoeFactory";
import { ShoeId } from "@/domain/models/shoes/shoeId";

/**
 * インメモリシューファクトリ
 */
export class InMemoryShoeFactory implements ShoeFactory {
  /**
   * シューを生成する
   *
   * @param cards カード
   * @returns シュー
   */
  public create(cards: Card[]): Shoe {
    return new Shoe(new ShoeId(crypto.randomUUID()), cards);
  }
}
