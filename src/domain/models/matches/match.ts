import { Player } from "../players/player";
import { RoundId } from "../rounds/roundId";
import { Shoe } from "../shoes/shoe";
import { MatchId } from "./matchId";
import { MatchNotification } from "./matchNotification";

/**
 * 試合
 */
export class Match {
  /**
   * デッキ数
   */
  private static readonly NUMBER_OF_DECKS = 6;

  /**
   * コンストラクタ
   *
   * @param id ID
   * @param shoe シュー
   * @param player プレイヤー
   * @param rounds ラウンド ID リスト
   */
  private constructor(
    public readonly id: MatchId,
    private readonly shoe: Shoe,
    private readonly player: Player,
    private roundIds: RoundId[],
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param player プレイヤー
   * @returns インスタンス
   */
  public static create(id: MatchId, player: Player) {
    return new Match(
      id,
      Shoe.createFromDecks(this.NUMBER_OF_DECKS).suffle(),
      player,
      [],
    );
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
