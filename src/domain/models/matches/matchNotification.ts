import { Player } from "../players/player";
import { MatchId } from "./matchId";

/**
 * 試合通知
 */
export interface MatchNotification {
  /**
   * ID を通知する
   *
   * @param id ID
   */
  notifyId(id: MatchId): void;

  /**
   * プレイヤーを通知する
   *
   * @param player
   */
  notifyPlayer(player: Player): void;
}
