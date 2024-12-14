/**
 * 試合生成コマンド
 */
export class MatchCreateCommand {
  /**
   * コンストラクタ
   *
   * @param shodId シュー ID
   */
  public constructor(public readonly shodId: string) {}
}
