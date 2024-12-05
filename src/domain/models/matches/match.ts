import { RoundId } from "../rounds/roundId";
import { ShoeId } from "../shoes/shoeId";
import { MatchId } from "./matchId";

/**
 * 試合
 */
export class Match {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param shoeId シュー ID
   * @param rounds ラウンド ID リスト
   */
  public constructor(
    public readonly id: MatchId,
    public readonly shoeId: ShoeId,
    private roundIds: RoundId[],
  ) {}

  /**
   * ラウンドを追加する
   * 
   * @param roundId 
   */
  public addRound(roundId: RoundId): void {
    this.roundIds = [...this.roundIds, roundId];
  }
}
