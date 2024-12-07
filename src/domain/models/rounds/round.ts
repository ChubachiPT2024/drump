import { Card } from "../cards/card";
import { Hand } from "../hands/hand";
import { ShoeId } from "../shoes/shoeId";
import { RoundId } from "./roundId";

/**
 * ラウンド
 */
export class Round {
  /**
   * ディーラーのハンド
   */
  private dealerHand: Hand = new Hand([]);

  /**
   * プレイヤーのハンド
   */
  private playerHand: Hand = new Hand([]);

  /**
   * コンストラクタ
   *
   * @param id ID
   * @param shoeId シュー ID
   */
  public constructor(
    public readonly id: RoundId,
    public readonly shoeId: ShoeId,
  ) {}

  /**
   * ディーラーにカードを配る
   *
   * @param card カード
   */
  public dealCardToDealer(card: Card): void {
    this.dealerHand = this.dealerHand.add(card);
  }

  /**
   * プレイヤーにカードを配る
   *
   * @param card カード
   */
  public dealCardToPlayer(card: Card): void {
    this.playerHand = this.playerHand.add(card);
  }

  /**
   * ディーラーのハンドを取得する
   *
   * @returns ディーラーのハンド
   */
  public getDealerHand(): Hand {
    return this.dealerHand;
  }

  /**
   * プレイヤーのハンドを取得する
   *
   * @returns プレイヤーのハンド
   */
  public getPlayerHand(): Hand {
    return this.playerHand;
  }
}
