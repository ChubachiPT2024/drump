import { Dealer } from "../dealers/dealer";
import { Player } from "../players/player";
import { RoundCount } from "../roundCounts/roundCount";
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
   * ディーラーを通知する
   *
   * @param dealer ディーラー
   */
  notifyDealer(dealer: Dealer): void;

  /**
   * プレイヤーを通知する
   *
   * @param player
   */
  notifyPlayer(player: Player): void;

  /**
   * ラウンド数を通知する
   *
   * @param roundCount ラウンド数
   */
  notifyRoundCount(roundCount: RoundCount): void;
}
