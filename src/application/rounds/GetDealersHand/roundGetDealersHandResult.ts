import { RoundGetDealersHandResultCard } from "./roundGetDealersHandResultCard";

/**
 * ディーラーのハンド取得結果
 */
export class RoundGetDealersHandResult {
  /**
   * コンストラクタ
   *
   * @param cards カード
   * @param softTotal ソフトトータル
   * @param hardTotal ハードトータル
   * @param isResolved ハンドが決まっているかどうか
   */
  public constructor(
    public readonly cards: RoundGetDealersHandResultCard[],
    public readonly softTotal: number,
    public readonly hardTotal: number,
    public readonly isResolved: boolean,
  ) {}
}
