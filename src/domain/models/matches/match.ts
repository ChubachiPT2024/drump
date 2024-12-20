import { Player } from "../players/player";
import { RoundId } from "../rounds/roundId";
import { ShoeId } from "../shoes/shoeId";
import { MatchId } from "./matchId";
import { MatchNotification } from "./matchNotification";

/**
 * 試合
 */
export class Match {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param shoeId シュー ID
   * @param player プレイヤー
   * @param rounds ラウンド ID リスト
   */
  private constructor(
    public readonly id: MatchId,
    public readonly shoeId: ShoeId,
    private readonly player: Player,
    private roundIds: RoundId[],
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param shoeId シュー ID
   * @param player プレイヤー
   * @returns インスタンス
   */
  public static create(id: MatchId, shoeId: ShoeId, player: Player) {
    return new Match(id, shoeId, player, []);
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
   * 通知する
   *
   * @param notification 通知
   */
  public notify(notification: MatchNotification): void {
    notification.notifyId(this.id);
    notification.notifyPlayer(this.player);
  }
}
