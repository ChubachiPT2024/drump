import { UserId } from "../users/userId";
import { Match } from "./match";

/**
 * 試合ファクトリ
 */
export interface MatchFactory {
  /**
   * 試合を生成する
   *
   * @param userIds ユーザ ID
   */
  create(userIds: UserId[]): Match;
}
