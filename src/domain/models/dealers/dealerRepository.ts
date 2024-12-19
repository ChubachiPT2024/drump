import { Dealer } from "./dealer";
import { DealerId } from "./dealerId";

/**
 * ディーラーリポジトリ
 */
export interface DealerRepository {
  /**
   * ディーラーを保存する
   *
   * @param dealer ディーラー
   */
  saveAsync(dealer: Dealer): Promise<void>;

  /**
   * ディーラーを検索する
   *
   * @param id ID
   * @returns ディーラー
   */
  findAsync(id: DealerId): Promise<Dealer>;
}
