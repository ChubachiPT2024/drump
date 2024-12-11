import { Round } from "./round";
import { RoundId } from "./roundId";

/**
 * ラウンドリポジトリ
 */
export interface RoundRepository {
  /**
   * ラウンドを保存する
   *
   * @param round ラウンド
   */
  saveAsync(round: Round): Promise<void>;

  /**
   * ラウンドを検索する
   *
   * @param id ID
   * @returns ラウンド
   */
  findAsync(id: RoundId): Promise<Round>;
}
