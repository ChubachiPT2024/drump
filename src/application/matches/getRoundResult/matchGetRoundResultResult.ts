import { RoundResult } from "@/domain/models/roundResultCalculators/roundResult";
import { MatchGetRoundResultResultHand } from "./matchGetRoundResultResultHand";
import { RoundHistory } from "@/domain/models/roundHistories/roundHistory";

/**
 * ラウンドの結果取得結果
 */
export class MatchGetRoundResultResult {
  /**
   * コンストラクタ
   *
   * @param ディーラーのハンド
   * @param result ラウンドの結果
   */
  private constructor(
    public readonly dealersHand: MatchGetRoundResultResultHand,
    public readonly result: RoundResult,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param roundHistory ラウンド履歴
   * @returns インスタンス
   */
  public static create(roundHistory: RoundHistory): MatchGetRoundResultResult {
    return new MatchGetRoundResultResult(
      MatchGetRoundResultResultHand.create(roundHistory.dealersHand),
      roundHistory.player.result,
    );
  }
}
