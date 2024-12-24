import { Dealer } from "./dealer";

/**
 * ディーラーファクトリ
 */
export interface DealerFactory {
  /**
   * ディーラーを生成する
   */
  create(): Dealer;
}
