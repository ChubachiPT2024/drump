/**
 * ヒント取得コマンド
 */
export class MatchGetHintCommand {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param playerId プレイヤー ID
   */
  public constructor(
    public readonly id: string,
    public readonly playerId: string,
  ) {}
}
