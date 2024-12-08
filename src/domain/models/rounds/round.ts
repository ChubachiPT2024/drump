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

  /**
   * プレイヤーのハンドをスタンドする
   */
  public standPlayerHand(): void {
    this.playerHand = this.playerHand.stand();
  }

  /**
   * ディーラーのハンドをスタンドする
   */
  public standDealearsHand(): void {
    this.dealerHand = this.dealerHand.stand();
  }

  /**
   * アップカードを取得する
   *
   * @returns アップカード
   */
  public getUpCard(): Card {
    // ディーラーのハンド専用のクラスを作るべきか？
    return this.dealerHand.getCards()[0];
  }

  /**
   * ディーラーがヒットしなければならないかどうかを取得する
   *
   * @returns ディーラーがヒットしなければならないかどうか
   */
  public shouldDealerHit(): boolean {
    // ディーラーのハンド専用のクラスを作るべきか？
    return this.dealerHand.calculateTotal() < 17;
  }

  /**
   * ラウンドの結果を計算する
   * 
   * @returns ラウンドの結果
   */
  public calculateResult(): RoundResult {
    // プレイヤーがバスト
    if (this.getPlayerHand().isBust()) {
      return RoundResult.Loss;
    }

    // プレイヤーがブラックジャック
    if (this.getPlayerHand().isBlackJack()) {
      if (this.getDealerHand().isBlackJack()) {
        return RoundResult.Push;
      }
      else {
        return RoundResult.Win;
      }
    }

    // プレイヤーがブラックジャック以外の 21 以下
    if (this.getDealerHand().isBust()) {
      return RoundResult.Win;
    }
    if (this.getDealerHand().isBlackJack()) {
      return RoundResult.Loss;
    }

    const playerTotal = this.getPlayerHand().calculateTotal();
    const dealerTotal = this.getDealerHand().calculateTotal();
    if (playerTotal > dealerTotal) {
      return RoundResult.Win;
    }
    else if(playerTotal === dealerTotal) {
      return RoundResult.Push;
    }
    else {
      return RoundResult.Loss;
    }
  }
}
