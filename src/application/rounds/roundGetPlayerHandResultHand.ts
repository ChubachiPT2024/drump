import { RoundGetPlayerHandResultCard } from "./roundGetPlayerHandResultCard";

/**
 * プレイヤーのハンド取得結果のハンド
 */
export class RoundGetPlayerHandResultHand {
  /**
   * コンストラクタ
   *
   * @param cards カード
   * @param softTotal ソフトトータル
   * @param hardTotal ハードトータル
   * @param isResolved ハンドが決まっているかどうか
   */
  public constructor(
    public readonly cards: RoundGetPlayerHandResultCard[],
    public readonly softTotal: number,
    public readonly hardTotal: number,
    public readonly isResolved: boolean,
  ) {}
}
