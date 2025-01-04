import { Hand } from "../hands/hand";
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
   * @param dealersHand ディーラーのハンド
   * @param players プレイヤー
   */
  public constructor(
    public readonly roundCount: RoundCount,
    public readonly dealersHand: Hand,
    public readonly players: RoundPlayerHistory[],
  ) {}
}
