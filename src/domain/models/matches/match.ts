import { PlayerId } from "../players/playerId";
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
   * @param playerId プレイヤー ID
   * @param rounds ラウンド ID リスト
   */
  private constructor(
    public readonly id: MatchId,
    public readonly shoeId: ShoeId,
    public readonly playerId: PlayerId,
    private roundIds: RoundId[],
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param shoeId シュー ID
   * @param playerId プレイヤー ID
   * @returns インスタンス
   */
  public static create(id: MatchId, shoeId: ShoeId, playerId: PlayerId) {
    return new Match(id, shoeId, playerId, []);
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
