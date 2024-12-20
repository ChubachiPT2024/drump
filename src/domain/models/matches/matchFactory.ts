import { ShoeId } from "../shoes/shoeId";
import { UserId } from "../users/userId";
import { Match } from "./match";

/**
 * 試合ファクトリ
 */
export interface MatchFactory {
  /**
   * 試合を生成する
   *
   * @param shoeId シュー ID
   * @param userId ユーザ ID
   */
  create(shoeId: ShoeId, userId: UserId): Match;
}
