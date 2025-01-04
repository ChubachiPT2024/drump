import { Card } from "../cards/card";

/**
 * ディーラー通知
 */
export interface DealerNotification {
  /**
   * アップカードを通知する
   *
   * @param upCard アップカード
   */
  notifyUpCard(upCard: Card): void;
}
