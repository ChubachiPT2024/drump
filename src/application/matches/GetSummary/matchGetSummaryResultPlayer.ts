import { PlayerNotification } from "@/domain/models/players/playerNotification";
import { MatchGetSummaryResultPlayerHand } from "./matchGetSummaryResultPlayerHand";
import { Hand } from "@/domain/models/hands/hand";
import { PlayerId } from "@/domain/models/players/playerId";

/**
 * 試合サマリ取得結果のプレイヤー
 */
export class MatchGetSummaryResultPlayer implements PlayerNotification {
  /**
   * ID
   */
  public id?: string;

  /**
   * ハンド
   */
  public hand?: MatchGetSummaryResultPlayerHand;

  /**
   * ID を通知する
   *
   * @param id ID
   */
  public notifyId(id: PlayerId): void {
    this.id = id.value;
  }

  /**
   * ハンドを通知する
   *
   * @param hand ハンド
   */
  public notifyHand(hand: Hand): void {
    this.hand = MatchGetSummaryResultPlayerHand.create(hand);
  }
}
