import { Credit } from "../credits/credit";
import { MatchPlayer } from "../matchPlayers/matchPlayer";
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
   * @param player プレイヤー
   */
  private constructor(
    public readonly id: MatchId,
    public readonly shoeId: ShoeId,
    private roundIds: RoundId[],
    private player: MatchPlayer,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param shoeId シュー ID
   * @returns インスタンス
   */
  public static create(id: MatchId, shoeId: ShoeId) {
    return new Match(id, shoeId, [], MatchPlayer.create());
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

  /**
   * クレジットを取得する
   *
   * @returns クレジット
   */
  public getCredit(): Credit {
    return this.player.getCredit();
  }
}
