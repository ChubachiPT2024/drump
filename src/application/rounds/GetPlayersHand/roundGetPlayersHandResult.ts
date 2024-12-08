import { RoundGetPlayersHandResultCard } from "./roundGetPlayersHandResultCard";

/**
 * プレイヤーのハンド取得結果
 */
export class RoundGetPlayersHandResult {
  /**
   * コンストラクタ
   *
   * @param cards カード
   * @param total トータル
   * @param isResolved ハンドが決まっているかどうか
   */
  public constructor(
    public readonly cards: RoundGetPlayersHandResultCard[],
    public readonly total: number,
    public readonly isResolved: boolean,
  ) {}
}
