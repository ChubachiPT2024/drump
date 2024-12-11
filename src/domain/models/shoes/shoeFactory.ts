import { Card } from "../cards/card";
import { Shoe } from "./shoe";

/**
 * シューファクトリ
 */
export interface ShoeFactory {
  /**
   * シューを生成する
   *
   * @param cards カード
   */
  create(cards: Card[]): Shoe;
}
