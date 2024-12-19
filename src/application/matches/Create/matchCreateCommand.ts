/**
 * 試合生成コマンド
 */
export class MatchCreateCommand {
  /**
   * コンストラクタ
   *
   * @param shodId シュー ID
   * @param playerId プレイヤー ID
   */
  public constructor(
    public readonly shodId: string,
    public readonly playerId: string,
  ) {}
}
