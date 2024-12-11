import { RoundResult } from "@/domain/models/roundResults/roundResult";

/**
 * ラウンドの結果取得結果
 */
export class RoundGetResultResult {
  /**
   * コンストラクタ
   *
   * @param result ラウンドの結果
   */
  public constructor(public readonly result: RoundResult) {}
}
