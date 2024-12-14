/**
 * マッチへのラウンド追加コマンド
 */
export class MatchAddRoundCommand {
  /**
   *コンストラクタ
   *
   * @param id ID
   * @param roundId ラウンド ID
   */
  public constructor(
    public readonly id: string,
    public readonly roundId: string,
  ) {}
}
