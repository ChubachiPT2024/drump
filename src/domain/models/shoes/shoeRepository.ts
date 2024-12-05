import { Shoe } from "./shoe";
import { ShoeId } from "./shoeId";

/**
 * シューリポジトリ
 */
export interface ShoeRepository {
  /**
   * シューを保存する
   *
   * @param shoe シュー
   */
  saveAsync(shoe: Shoe): Promise<void>;

  /**
   * シューを検索する
   *
   * @param id ID
   * @returns シュー
   */
  findAsync(id: ShoeId): Promise<Shoe>;
}
