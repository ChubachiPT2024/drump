/**
 * 試合結果取得結果のプレイヤー
 */
export class MatchGetResultResultPlayer {
  public constructor(
    public readonly creditHistories: number[],
    public readonly finalCredit: number,
  ) {}
}
