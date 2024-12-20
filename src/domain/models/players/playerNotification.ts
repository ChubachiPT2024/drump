import { Hand } from "../hands/hand";
import { PlayerId } from "./playerId";

/**
 * プレイヤー通知
 */
export interface PlayerNotification {
  /**
   * ID を通知する
   *
   * @param id ID
   */
  notifyId(id: PlayerId): void;

  /**
   * ハンドを通知する
   *
   * @param hand ハンド
   */
  notifyHand(hand: Hand): void;
}
