import { HandSignal } from "@/domain/models/handSignals/handSignal";

/**
 * ハンドシグナルの選択肢取得結果
 */
export class PlayerGetHandSignalOptionsResult {
  /**
   * コンストラクタ
   *
   * @param handSignals ハンドシグナル
   */
  public constructor(public readonly handSignals: HandSignal[]) {}
}
