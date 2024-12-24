import { MatchGetSummaryResultPlayer } from "./matchGetSummaryResultPlayer";
import { MatchNotification } from "@/domain/models/matches/matchNotification";
import { MatchId } from "@/domain/models/matches/matchId";
import { Player } from "@/domain/models/players/player";
import { MatchGetSummaryResultDealer } from "./matchGetSummaryResultDealer";
import { Dealer } from "@/domain/models/dealers/dealer";

/**
 * 試合サマリ取得結果
 */
export class MatchGetSummaryResult implements MatchNotification {
  /**
   * ID
   */
  public id?: string;

  /**
   * ディーラー
   */
  public readonly dealer = new MatchGetSummaryResultDealer();

  /**
   * プレイヤー
   */
  public readonly player = new MatchGetSummaryResultPlayer();

  /**
   * ID を通知する
   *
   * @param id ID
   */
  public notifyId(id: MatchId): void {
    this.id = id.value;
  }

  /**
   * ディーラーを通知する
   *
   * @param dealer ディーラー
   */
  public notifyDealer(dealer: Dealer): void {
    dealer.notify(this.dealer);
  }

  /**
   * プレイヤーを通知する
   *
   * @param player プレイヤー
   */
  public notifyPlayer(player: Player): void {
    player.notify(this.player);
  }
}
