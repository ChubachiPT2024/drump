/**
 * ラウンド生成コマンド
 */
export class RoundCreateCommand {
  /**
   * コンストラクタ
   *
   * @param shoeId シュー ID
   * @param playerId プレイヤー ID
   */
  public constructor(
    public readonly shoeId: string,
    public readonly playerId: string,
  ) {}
}
