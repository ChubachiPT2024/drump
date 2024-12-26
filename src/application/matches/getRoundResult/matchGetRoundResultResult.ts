import { RoundResult } from "@/domain/models/roundResultCalculators/roundResult";

/**
 * ラウンドの結果取得結果
 */
export class MatchGetRoundResultResult {
  /**
   * コンストラクタ
   *
   * @param result ラウンドの結果
   */
  public constructor(public readonly result: RoundResult) {}
}
