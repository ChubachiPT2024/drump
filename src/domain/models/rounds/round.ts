import { Card } from "../cards/card";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
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
   * @param dealersHand ディーラーのハンド
   * @param player プレイヤー
   */
  private constructor(
    public readonly id: RoundId,
    public readonly shoeId: ShoeId,
    private dealersHand: Hand,
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
    return new Round(id, shoeId, new Hand([], false), RoundPlayer.create());
  }

  /**
   * ディーラーにカードを配る
   *
   * @param card カード
   */
  public dealCardToDealer(card: Card): void {
    this.dealersHand = this.dealersHand.add(card);
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
    return this.dealersHand;
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
    this.dealersHand = this.dealersHand.stand();
  }

  /**
   * アップカードを取得する
   *
   * @returns アップカード
   */
  public getUpCard(): Card {
    // TODO ディーラーのハンド専用のクラスを作るべきか？
    return this.dealersHand.getCards()[0];
  }

  /**
   * ディーラーがヒットしなければならないかどうかを取得する
   *
   * @returns ディーラーがヒットしなければならないかどうか
   */
  public shouldDealerHit(): boolean {
    // TODO ディーラーのハンド専用のクラスを作るべきか？
    return this.dealersHand.calculateTotal() < 17;
  }
}
