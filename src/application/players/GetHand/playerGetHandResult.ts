import { PlayerGetHandResultCard } from "./playerGetHandResultCard";

/**
 * プレイヤーのハンド取得結果
 */
export class PlayerGetHandResult {
  /**
   * コンストラクタ
   *
   * @param cards カード
   * @param total トータル
   * @param isResolved ハンドが決まっているかどうか
   */
  public constructor(
    public readonly cards: PlayerGetHandResultCard[],
    public readonly total: number,
    public readonly isResolved: boolean,
  ) {}
}
