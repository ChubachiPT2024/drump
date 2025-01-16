import { Card } from "@/domain/models/cards/card";
import { DealerNotification } from "@/domain/models/dealers/dealerNotification";

/**
 * 試合サマリ取得結果のディーラー
 */
export class MatchGetSummaryResultDealer implements DealerNotification {
  /**
   * アップカード
   */
  public upCard?: Card;

  /**
   * アップカードのソフトトータル
   */
  public upCardSoftTotal?: number;

  /**
   * アップカードを通知する
   *
   * @param upCard アップカード
   */
  public notifyUpCard(upCard?: Card): void {
    this.upCard = upCard;
    this.upCardSoftTotal = upCard?.getSoftPoint();
  }
}
