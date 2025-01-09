import { Hand } from "@/domain/models/hands/hand";
import { MatchGetRoundResultResultCard } from "./matchGetRoundResultResultCard";

/**
 * ラウンド結果取得結果のハンド
 */
export class MatchGetRoundResultResultHand {
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
    public readonly cards: MatchGetRoundResultResultCard[],
    public readonly total: number,
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
  public static create(hand: Hand): MatchGetRoundResultResultHand {
    return new MatchGetRoundResultResultHand(
      hand.getCards(),
      hand.calculateTotal(),
      hand.isResolved(),
      hand.isBlackJack(),
      hand.isBust(),
    );
  }
}
