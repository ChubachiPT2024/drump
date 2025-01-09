import { MatchGetResultResultPlayer } from "./matchGetResultResultPlayer";

/**
 * 試合結果取得結果
 */
export class MatchGetResultResult {
  public constructor(public readonly players: MatchGetResultResultPlayer[]) {}
}
