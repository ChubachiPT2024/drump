import { ChipAmount } from "../chipAmounts/chipAmount";
import { RoundResult } from "../roundResultCalculators/roundResult";

/**
 * ラウンドのプレイヤー履歴
 */
export class RoundPlayerHistory {
  /**
   * コンストラクタ
   *
   * @param result 結果
   * @param credit クレジット
   */
  public constructor(
    public readonly result: RoundResult,
    public readonly credit: ChipAmount,
  ) {}
}
