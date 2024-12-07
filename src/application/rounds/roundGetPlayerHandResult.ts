import { RoundGetPlayerHandResultCard } from "./roundGetPlayerHandResultCard";

/**
 * プレイヤーのハンド取得結果
 */
export class RoundGetPlayerHandResult {
  /**
   * コンストラクタ
   *
   * @param cards カード
   */
  public constructor(public readonly cards: RoundGetPlayerHandResultCard[]) {}
}
