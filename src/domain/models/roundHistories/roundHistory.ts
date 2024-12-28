import { RoundCount } from "../roundCounts/roundCount";
import { RoundPlayerHistory } from "./roundPlayerHistory";

/**
 * ラウンド履歴
 */
export class RoundHistory {
  /**
   * コンストラクタ
   *
   * @param roundCount ラウンド数
   * @param player プレイヤー
   */
  public constructor(
    public readonly roundCount: RoundCount,
    public readonly player: RoundPlayerHistory,
  ) {}
}
