import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
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

  /**
   * ハンドシグナルの選択肢を通知する
   *
   * @param handSignalOptions ハンドシグナルの選択肢
   */
  notifyHandSignalOptions(handSignalOptions: HandSignal[]): void;
}
