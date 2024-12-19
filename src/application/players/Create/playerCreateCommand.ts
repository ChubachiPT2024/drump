/**
 * プレイヤー生成コマンド
 */
export class PlayerCreateCommand {
  /**
   * コンストラクタ
   *
   * @param userId ユーザ ID
   */
  public constructor(public readonly userId: string) {}
}
