import { Card } from "../cards/card";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
import { UserId } from "../users/userId";
import { PlayerId } from "./playerId";

/**
 * プレイヤー
 */
export class Player {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param userId ユーザ ID
   * @param hand ハンド
   */
  private constructor(
    public readonly id: PlayerId,
    public readonly userId: UserId,
    private hand: Hand,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param userId ユーザ ID
   * @returns インスタンス
   */
  public static create(id: PlayerId, userId: UserId): Player {
    return new Player(id, userId, Hand.create());
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
   * ハンドシグナルの選択肢を取得する
   *
   * @returns ハンドシグナルの選択肢
   */
  public getHandSignalOptions(): HandSignal[] {
    if (this.hand.isResolved()) {
      return [];
    }

    return [HandSignal.Hit, HandSignal.Stand];
  }

  /**
   * スタンドする
   */
  public stand(): void {
    this.hand = this.hand.stand();
  }
}
