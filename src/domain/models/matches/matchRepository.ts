import { Match } from "./match";
import { MatchId } from "./matchId";

/**
 * 試合リポジトリ
 */
export interface MatchRepository {
  /**
   * 試合を保存する
   *
   * @param match 試合
   */
  saveAsync(match: Match): Promise<void>;

  /**
   * 試合を検索する
   *
   * @param id ID
   * @returns 試合
   */
  findAsync(id: MatchId): Promise<Match>;
}
