import { Card } from "@/domain/models/cards/card";
import { DealerNotification } from "@/domain/models/dealers/dealerNotification";
import { MatchGetSummaryResultHand } from "./matchGetSummaryResultHand";
import { Hand } from "@/domain/models/hands/hand";

/**
 * 試合サマリ取得結果のディーラー
 */
export class MatchGetSummaryResultDealer implements DealerNotification {
  /**
   * アップカード
   */
  public upCard?: Card;

  /**
   * ハンド
   */
  public hand?: MatchGetSummaryResultHand;

  /**
   * アップカードを通知する
   *
   * @param upCard アップカード
   */
  public notifyUpCard(upCard: Card): void {
    this.upCard = upCard;
  }

  /**
   * ハンドを通知する
   *
   * @param hand ハンド
   */
  public notifyHand(hand: Hand): void {
    this.hand = MatchGetSummaryResultHand.create(hand);
  }
}
