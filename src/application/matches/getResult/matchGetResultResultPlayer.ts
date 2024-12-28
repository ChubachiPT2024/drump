/**
 * 試合結果取得結果のプレイヤー
 */
export class MatchGetResultResultPlayer {
  /**
   * コンストラクタ
   *
   * @param creditHistories クレジット履歴
   * @param finalCredit 最終クレジット
   * @param balance 収支
   */
  public constructor(
    public readonly creditHistories: number[],
    public readonly finalCredit: number,
    public readonly balance: number,
  ) {}
}
