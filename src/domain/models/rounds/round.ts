import { Card } from "../cards/card";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
import { RoundResult } from "../roundResults/roundResult";
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
   * @param playersHand プレイヤーのハンド
   */
  public constructor(
    public readonly id: RoundId,
    public readonly shoeId: ShoeId,
    private dealersHand: Hand,
    private playersHand: Hand,
  ) {}

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
    this.playersHand = this.playersHand.add(card);
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
    return this.playersHand;
  }

  /**
   * プレイヤーのハンドシグナルの選択肢を取得する
   *
   * @returns プレイヤーのハンドシグナルの選択肢
   */
  public getPlayersHandSignalOptions(): HandSignal[] {
    if (this.playersHand.isResolved()) {
      return [];
    }

    return [HandSignal.Hit, HandSignal.Stand];
  }

  /**
   * プレイヤーのハンドをスタンドする
   */
  public standPlayersHand(): void {
    this.playersHand = this.playersHand.stand();
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
    // ディーラーのハンド専用のクラスを作るべきか？
    return this.dealersHand.getCards()[0];
  }

  /**
   * ディーラーがヒットしなければならないかどうかを取得する
   *
   * @returns ディーラーがヒットしなければならないかどうか
   */
  public shouldDealerHit(): boolean {
    // ディーラーのハンド専用のクラスを作るべきか？
    return this.dealersHand.calculateTotal() < 17;
  }

  /**
   * ラウンドの結果を計算する
   *
   * @returns ラウンドの結果
   */
  public calculateResult(): RoundResult {
    // プレイヤーがバスト
    if (this.getPlayersHand().isBust()) {
      return RoundResult.Loss;
    }

    // プレイヤーがブラックジャック
    if (this.getPlayersHand().isBlackJack()) {
      if (this.getDealersHand().isBlackJack()) {
        return RoundResult.Push;
      } else {
        return RoundResult.Win;
      }
    }

    // プレイヤーがブラックジャック以外の 21 以下
    if (this.getDealersHand().isBust()) {
      return RoundResult.Win;
    }
    if (this.getDealersHand().isBlackJack()) {
      return RoundResult.Loss;
    }

    const playerTotal = this.getPlayersHand().calculateTotal();
    const dealerTotal = this.getDealersHand().calculateTotal();
    if (playerTotal > dealerTotal) {
      return RoundResult.Win;
    } else if (playerTotal === dealerTotal) {
      return RoundResult.Push;
    } else {
      return RoundResult.Loss;
    }
  }
}
