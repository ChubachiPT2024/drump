/**
 * ラウンド生成コマンド
 */
export class RoundCreateCommand {
  /**
   * コンストラクタ
   *
   * @param playerId プレイヤー ID
   */
  public constructor(public readonly playerId: string) {}
}
