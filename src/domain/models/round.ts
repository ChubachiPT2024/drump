import { Hand } from "./hand";
import { Shoe } from "./shoe";

/**
 * ラウンド
 */
export class Round {
  /**
   * ディーラーのハンド
   */
  private dealerHand: Hand = new Hand([])

  /**
   * プレイヤーのハンド
   */
  private playerHand: Hand = new Hand([])

  // TODO Match の実装時、Shoe は Round ではなく Match に持たせる
  /**
   * コンストラクタ
   * 
   * @param id ID
   * @param shoe シュー
   */
  public constructor(
    public readonly id: number,
    private shoe: Shoe
  ) {
  }

  /**
   * 最初のハンドを配る
   */
  public dealInitialHands(): void {
    for (let i = 0; i < 2; i++) {
      this.dealerHand = this.dealerHand.add(this.shoe.peek())
      this.shoe = this.shoe.draw()
    }

    for (let i = 0; i < 2; i++) {
      this.playerHand = this.playerHand.add(this.shoe.peek())
      this.shoe = this.shoe.draw()
    }
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
