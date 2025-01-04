import { MatchGetRoundResultResultHand } from "./matchGetRoundResultResultHand";
import { RoundHistory } from "@/domain/models/roundHistories/roundHistory";
import { MatchGetRoundResultResultPlayer } from "./matchGetRoundResultResultPlayer";

/**
 * ラウンドの結果取得結果
 */
export class MatchGetRoundResultResult {
  /**
   * コンストラクタ
   *
   * @param dealersHand ディーラーのハンド
   * @param players プレイヤー
   */
  private constructor(
    public readonly dealersHand: MatchGetRoundResultResultHand,
    public readonly players: MatchGetRoundResultResultPlayer[],
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
      roundHistory.players.map((player) =>
        MatchGetRoundResultResultPlayer.create(player),
      ),
    );
  }
}
