/**
 * ベットコマンド
 */
export class MatchBetCommand {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param playerId プレイヤー ID
   * @param amount 額
   */
  public constructor(
    public readonly id: string,
    public readonly playerId: string,
    public readonly amount: number,
  ) {}
}
