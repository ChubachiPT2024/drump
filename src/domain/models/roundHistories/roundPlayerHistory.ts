import { ChipAmount } from "../chipAmounts/chipAmount";
import { PlayerId } from "../players/playerId";
import { RoundResult } from "../roundResultCalculators/roundResult";

/**
 * ラウンドのプレイヤー履歴
 */
export class RoundPlayerHistory {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param result 結果
   * @param credit クレジット
   */
  public constructor(
    public readonly id: PlayerId,
    public readonly result: RoundResult,
    public readonly credit: ChipAmount,
  ) {}
}
