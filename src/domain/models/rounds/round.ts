import { Hand } from "../hands/hand";
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
    private readonly shoeId: number,
  ) {}

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
