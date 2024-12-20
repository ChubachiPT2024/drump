import { Hand } from "@/domain/models/hands/hand";
import { MatchGetSummaryResultCard } from "./matchGetSummaryResultCard";

/**
 * 試合サマリ取得結果のハンド
 */
export class MatchGetSummaryResultHand {
  /**
   * コンストラクタ
   *
   * @param cards カード
   * @param total トータル
   * @param isResolved ハンドが決まっているかどうか
   */
  private constructor(
    public readonly cards: MatchGetSummaryResultCard[],
    public readonly total: number,
    public readonly isResolved: boolean,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param hand ハンド
   * @returns インスタンス
   */
  public static create(hand: Hand): MatchGetSummaryResultHand {
    return new MatchGetSummaryResultHand(
      hand.getCards(),
      hand.calculateTotal(),
      hand.isResolved(),
    );
  }
}
