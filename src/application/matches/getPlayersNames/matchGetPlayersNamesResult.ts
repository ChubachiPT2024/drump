import { MatchGetPlayersNamesResultPlayer } from "./matchGetPlayersNamesResultPlayer";

/**
 * プレイヤー名取得結果
 */
export class MatchGetPlayersNamesResult {
  /**
   * コンストラクタ
   *
   * @param players プレイヤー
   */
  public constructor(
    public readonly players: MatchGetPlayersNamesResultPlayer[],
  ) {}
}
