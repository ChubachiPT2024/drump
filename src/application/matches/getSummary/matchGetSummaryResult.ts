import { MatchGetSummaryResultPlayer } from "./matchGetSummaryResultPlayer";
import { MatchNotification } from "@/domain/models/matches/matchNotification";
import { MatchId } from "@/domain/models/matches/matchId";
import { Player } from "@/domain/models/players/player";
import { MatchGetSummaryResultDealer } from "./matchGetSummaryResultDealer";
import { Dealer } from "@/domain/models/dealers/dealer";
import { RoundCount } from "@/domain/models/roundCounts/roundCount";

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
  public players?: MatchGetSummaryResultPlayer[];

  /**
   * ラウンド数
   */
  public roundCount?: number;

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
   * @param players プレイヤー
   */
  public notifyPlayers(players: Player[]): void {
    const notifications = [];
    for (const player of players) {
      const notification = new MatchGetSummaryResultPlayer();
      player.notify(notification);
      notifications.push(notification);
    }

    this.players = notifications;
  }

  /**
   * ラウンド数を通知する
   *
   * @param roundCount ラウンド数
   */
  public notifyRoundCount(roundCount: RoundCount): void {
    this.roundCount = roundCount.value;
  }
}
