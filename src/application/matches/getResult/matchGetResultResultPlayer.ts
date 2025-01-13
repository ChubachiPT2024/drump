/**
 * 試合結果取得結果のプレイヤー
 */
export class MatchGetResultResultPlayer {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param creditHistories クレジット履歴
   * @param finalCredit 最終クレジット
   * @param balance 収支
   * @param rank 順位
   */
  public constructor(
    public readonly id: string,
    public readonly creditHistories: number[],
    public readonly finalCredit: number,
    public readonly balance: number,
    public readonly rank: number,
  ) {}
}
