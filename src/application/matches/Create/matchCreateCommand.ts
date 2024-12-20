/**
 * 試合生成コマンド
 */
export class MatchCreateCommand {
  /**
   * コンストラクタ
   *
   * @param shodId シュー ID
   * @param userId ユーザ ID
   */
  public constructor(
    public readonly shodId: string,
    public readonly userId: string,
  ) {}
}
