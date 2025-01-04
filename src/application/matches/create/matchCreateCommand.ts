/**
 * 試合生成コマンド
 */
export class MatchCreateCommand {
  /**
   * コンストラクタ
   *
   * @param userId ユーザ ID
   */
  public constructor(public readonly userId: string) {}
}
