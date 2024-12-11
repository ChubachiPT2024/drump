import { RoundGetDealersHandResultCard } from "./roundGetDealersHandResultCard";

/**
 * ディーラーのハンド取得結果
 */
export class RoundGetDealersHandResult {
  /**
   * コンストラクタ
   *
   * @param cards カード
   * @param total トータル
   * @param isResolved ハンドが決まっているかどうか
   */
  public constructor(
    public readonly cards: RoundGetDealersHandResultCard[],
    public readonly total: number,
    public readonly isResolved: boolean,
  ) {}
}
