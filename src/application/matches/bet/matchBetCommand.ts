/**
 * ベットコマンド
 */
export class MatchBetCommand {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param amount 額
   */
  public constructor(
    public readonly id: string,
    public readonly amount: number,
  ) {}
}
