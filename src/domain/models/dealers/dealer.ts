import { Card } from "../cards/card";
import { Hand } from "../hands/hand";
import { DealerId } from "./dealerId";
import { DealerNotification } from "./dealerNotification";

/**
 * ディーラー
 */
export class Dealer {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param hand ハンド
   */
  private constructor(
    public readonly id: DealerId,
    private hand: Hand,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @returns インスタンス
   */
  public static create(id: DealerId): Dealer {
    return new Dealer(id, Hand.create());
  }

  /**
   * ハンドにカードを加える
   *
   * @param card カード
   */
  public addCardToHand(card: Card): void {
    this.hand = this.hand.add(card);
  }

  /**
   * ハンドを取得する
   *
   * @returns ハンド
   */
  public getHand(): Hand {
    return this.hand;
  }

  /**
   * スタンドする
   */
  public stand(): void {
    this.hand = this.hand.stand();
  }

  /**
   * アップカードを取得する
   *
   * @returns アップカード
   */
  public getUpCard(): Card {
    return this.hand.getCards()[0];
  }

  /**
   * ヒットしなければならないかどうかを取得する
   *
   * @returns ヒットしなければならないかどうか
   */
  public shouldHit(): boolean {
    return this.hand.calculateTotal() < 17;
  }

  /**
   * 通知する
   *
   * @param notification 通知
   */
  public notify(notification: DealerNotification): void {
    notification.notifyUpCard(this.getUpCard());

    // TODO 実装方法の検討
    // 条件を満たす場合のみ通知という意味で問題ない気もするが、
    // ApplicationService の処理で隠した方が良いような気もする
    if (this.getHand().isResolved()) {
      notification.notifyHand(this.getHand());
    }
  }
}