import { Card } from "../cards/card";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
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
   * @param dealerHand ディーラーのハンド
   * @param playerHand プレイヤーのハンド
   */
  public constructor(
    public readonly id: RoundId,
    public readonly shoeId: ShoeId,
    private dealerHand: Hand,
    private playerHand: Hand,
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

  /**
   * プレイヤーのハンドシグナルの選択肢を取得する
   *
   * @returns プレイヤーのハンドシグナルの選択肢
   */
  public getPlayerHandSignalOptions(): HandSignal[] {
    if (this.playerHand.isResolved()) {
      return [];
    }

    return [HandSignal.Hit, HandSignal.Stand];
  }
}
