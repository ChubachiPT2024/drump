import { Card } from "../cards/card";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
import { RoundPlayer } from "../roundPlayers/roundPlayer";
import { ShoeId } from "../shoes/shoeId";
import { RoundId } from "./roundId";
import { DealerId } from "../dealers/dealerId";

/**
 * ラウンド
 */
export class Round {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param shoeId シュー ID
   * @param dealerId ディーラー ID
   * @param player プレイヤー
   */
  private constructor(
    public readonly id: RoundId,
    public readonly shoeId: ShoeId,
    public readonly dealerId: DealerId,
    private readonly player: RoundPlayer,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param shoeId シュー ID
   * @param dealerId ディーラー ID
   * @returns インスタンス
   */
  public static create(id: RoundId, shoeId: ShoeId, dealerId: DealerId) {
    return new Round(id, shoeId, dealerId, RoundPlayer.create());
  }

  /**
   * プレイヤーにカードを配る
   *
   * @param card カード
   */
  public dealCardToPlayer(card: Card): void {
    this.player.addCardToHand(card);
  }

  /**
   * プレイヤーのハンドを取得する
   *
   * @returns プレイヤーのハンド
   */
  public getPlayersHand(): Hand {
    return this.player.getHand();
  }

  /**
   * プレイヤーのハンドシグナルの選択肢を取得する
   *
   * @returns プレイヤーのハンドシグナルの選択肢
   */
  public getPlayersHandSignalOptions(): HandSignal[] {
    return this.player.getHandSignalOptions();
  }

  /**
   * プレイヤーのハンドをスタンドする
   */
  public standPlayersHand(): void {
    this.player.stand();
  }
}
