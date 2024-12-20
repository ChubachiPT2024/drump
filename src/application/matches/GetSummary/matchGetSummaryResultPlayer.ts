import { PlayerNotification } from "@/domain/models/players/playerNotification";
import { Hand } from "@/domain/models/hands/hand";
import { PlayerId } from "@/domain/models/players/playerId";
import { MatchGetSummaryResultHand } from "./matchGetSummaryResultHand";
import { HandSignal } from "@/domain/models/handSignals/handSignal";

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
  public hand?: MatchGetSummaryResultHand;

  /**
   * ハンドシグナルの選択肢
   */
  public handSignalOptions: HandSignal[] = [];

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
    this.hand = MatchGetSummaryResultHand.create(hand);
  }

  /**
   * ハンドシグナルの選択肢を通知する
   *
   * @param handSignalOptions ハンドシグナルの選択肢
   */
  public notifyHandSignalOptions(handSignalOptions: HandSignal[]): void {
    this.handSignalOptions = handSignalOptions;
  }
}
