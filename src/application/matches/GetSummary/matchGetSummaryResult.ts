import { MatchGetSummaryResultPlayer } from "./matchGetSummaryResultPlayer";
import { MatchNotification } from "@/domain/models/matches/matchNotification";
import { MatchId } from "@/domain/models/matches/matchId";
import { Player } from "@/domain/models/players/player";

/**
 * 試合サマリ取得結果
 */
export class MatchGetSummaryResult implements MatchNotification {
  /**
   * ID
   */
  public id?: string;

  /**
   * プレイヤー
   */
  public readonly player: MatchGetSummaryResultPlayer =
    new MatchGetSummaryResultPlayer();

  /**
   * ID を通知する
   *
   * @param id ID
   */
  public notifyId(id: MatchId): void {
    this.id = id.value;
  }

  /**
   * プレイヤーを通知する
   *
   * @param player
   */
  public notifyPlayer(player: Player): void {
    player.notify(this.player);
  }
}
