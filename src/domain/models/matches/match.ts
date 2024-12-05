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
    private readonly shoeId: ShoeId,
    private roundIds: RoundId[],
  ) {}
}
