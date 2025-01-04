/**
 * 試合生成コマンド
 */
export class MatchCreateCommand {
  /**
   * コンストラクタ
   *
   * @param userIds ユーザ ID
   */
  public constructor(public readonly userIds: string[]) {}
}
