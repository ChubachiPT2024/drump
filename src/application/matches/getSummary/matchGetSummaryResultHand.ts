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
   * @param isBlackJack ブラックジャックかどうか
   * @param isBust バストかどうか
   */
  private constructor(
    public readonly cards: MatchGetSummaryResultCard[],
    public readonly softTotal: number | undefined,
    public readonly hardTotal: number,
    public readonly isResolved: boolean,
    public readonly isBlackJack: boolean,
    public readonly isBust: boolean,
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
      hand.calculateSoftTotal(),
      hand.calculateHardTotal(),
      hand.isResolved(),
      hand.isBlackJack(),
      hand.isBust(),
    );
  }
}
