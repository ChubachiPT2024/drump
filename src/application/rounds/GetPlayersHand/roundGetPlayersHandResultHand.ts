import { RoundGetPlayersHandResultCard } from "./roundGetPlayersHandResultCard";

/**
 * プレイヤーのハンド取得結果のハンド
 */
export class RoundGetPlayersHandResultHand {
  /**
   * コンストラクタ
   *
   * @param cards カード
   * @param softTotal ソフトトータル
   * @param hardTotal ハードトータル
   * @param isResolved ハンドが決まっているかどうか
   */
  public constructor(
    public readonly cards: RoundGetPlayersHandResultCard[],
    public readonly softTotal: number,
    public readonly hardTotal: number,
    public readonly isResolved: boolean,
  ) {}
}
