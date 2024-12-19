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
  private constructor(
    public readonly id: MatchId,
    public readonly shoeId: ShoeId,
    private roundIds: RoundId[],
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param shoeId シュー ID
   * @returns インスタンス
   */
  public static create(id: MatchId, shoeId: ShoeId) {
    return new Match(id, shoeId, []);
  }

  /**
   * ラウンドを追加する
   *
   * @param roundId
   */
  public addRound(roundId: RoundId): void {
    this.roundIds = [...this.roundIds, roundId];
  }

  /**
   * ラウンド ID リストを取得する
   *
   * @returns ラウンド ID リスト
   */
  public getRoundIds(): RoundId[] {
    return [...this.roundIds];
  }
}
