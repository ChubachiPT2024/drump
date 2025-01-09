/**
 * プレイヤー名取得結果プレイヤー
 */
export class MatchGetPlayersNamesResultPlayer {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param name 名前
   */
  public constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}
}
