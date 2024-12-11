import { ShoeId } from "../shoes/shoeId";
import { Round } from "./round";

/**
 * ラウンドファクトリ
 */
export interface RoundFactory {
  /**
   * ラウンドを生成する
   *
   * @param shoeId シュー ID
   */
  create(shoeId: ShoeId): Round;
}
