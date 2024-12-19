import { PlayerId } from "../players/playerId";
import { ShoeId } from "../shoes/shoeId";
import { Match } from "./match";

/**
 * 試合ファクトリ
 */
export interface MatchFactory {
  /**
   * 試合を生成する
   *
   * @param shoeId シュー ID
   * @param playerId プレイヤー ID
   */
  create(shoeId: ShoeId, playerId: PlayerId): Match;
}
