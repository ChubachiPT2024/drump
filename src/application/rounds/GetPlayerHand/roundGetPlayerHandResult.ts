import { RoundGetPlayerHandResultHand } from "./roundGetPlayerHandResultHand";

/**
 * プレイヤーのハンド取得結果
 */
export class RoundGetPlayerHandResult {
  /**
   * コンストラクタ
   *
   * @param hand ハンド
   */
  public constructor(public readonly hand: RoundGetPlayerHandResultHand) {}
}
