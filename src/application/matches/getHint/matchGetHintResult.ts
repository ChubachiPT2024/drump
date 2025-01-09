import { HandSignal } from "@/domain/models/handSignals/handSignal";

/**
 * ヒント取得結果
 */
export class MatchGetHintResult {
  /**
   * コンストラクタ
   *
   * @param basicStrategy ベーシックストラテジー
   */
  public constructor(public readonly basicStrategy: HandSignal) {}
}
