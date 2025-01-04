import { RoundPlayerHistory } from "@/domain/models/roundHistories/roundPlayerHistory";
import { RoundResult } from "@/domain/models/roundResultCalculators/roundResult";

/**
 * ラウンド結果取得結果のプレイヤー
 */
export class MatchGetRoundResultResultPlayer {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param result 結果
   * @param credit クレジット
   */
  private constructor(
    public readonly id: string,
    public readonly result: RoundResult,
    public readonly credit: number,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param roundPlayerHistory ラウンドのプレイヤー履歴
   * @returns インスタンス
   */
  public static create(
    roundPlayerHistory: RoundPlayerHistory,
  ): MatchGetRoundResultResultPlayer {
    return new MatchGetRoundResultResultPlayer(
      roundPlayerHistory.id.value,
      roundPlayerHistory.result,
      roundPlayerHistory.credit.value,
    );
  }
}
