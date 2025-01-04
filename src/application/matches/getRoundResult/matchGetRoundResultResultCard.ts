import { Card } from "@/domain/models/cards/card";
import { Rank } from "@/domain/models/ranks/rank";
import { Suit } from "@/domain/models/suits/suit";

/**
 * ラウンド結果取得結果のカード
 */
export class MatchGetRoundResultResultCard {
  /**
   * ランク
   */
  public readonly rank: Rank;

  /**
   * スート
   */
  public readonly suit: Suit;

  /**
   * コンストラクタ
   *
   * @param card カード
   */
  public constructor(card: Card) {
    this.rank = card.rank;
    this.suit = card.suit;
  }
}
