import { Card } from "../cards/card";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
import { RoundDealer } from "../roundDealers/roundDealer";
import { RoundPlayer } from "../roundPlayers/roundPlayer";
import { ShoeId } from "../shoes/shoeId";
import { RoundId } from "./roundId";

/**
 * ラウンド
 */
export class Round {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param shoeId シュー ID
   * @param dealer ディーラー
   * @param player プレイヤー
   */
  private constructor(
    public readonly id: RoundId,
    public readonly shoeId: ShoeId,
    private readonly dealer: RoundDealer,
    private readonly player: RoundPlayer,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param shoeId シュー ID
   * @returns インスタンス
   */
  public static create(id: RoundId, shoeId: ShoeId) {
    return new Round(id, shoeId, RoundDealer.create(), RoundPlayer.create());
  }

  /**
   * ディーラーにカードを配る
   *
   * @param card カード
   */
  public dealCardToDealer(card: Card): void {
    this.dealer.addCardToHand(card);
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
   * ディーラーのハンドを取得する
   *
   * @returns ディーラーのハンド
   */
  public getDealersHand(): Hand {
    return this.dealer.getHand();
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

  /**
   * ディーラーのハンドをスタンドする
   */
  public standDealearsHand(): void {
    this.dealer.stand();
  }

  /**
   * アップカードを取得する
   *
   * @returns アップカード
   */
  public getUpCard(): Card {
    return this.dealer.getUpCard();
  }

  /**
   * ディーラーがヒットしなければならないかどうかを取得する
   *
   * @returns ディーラーがヒットしなければならないかどうか
   */
  public shouldDealerHit(): boolean {
    return this.dealer.shouldHit();
  }
}
