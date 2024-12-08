import { RoundGetPlayersHandResultHand } from "./roundGetPlayersHandResultHand";

/**
 * プレイヤーのハンド取得結果
 */
export class RoundGetPlayersHandResult {
  /**
   * コンストラクタ
   *
   * @param hand ハンド
   */
  public constructor(public readonly hand: RoundGetPlayersHandResultHand) {}
}
