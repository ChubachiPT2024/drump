import { Card } from "../cards/card";
import { Hand } from "../hands/hand";

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

  /**
   * ハンドを通知する
   *
   * @param hand ハンド
   */
  notifyHand(hand: Hand): void;
}
