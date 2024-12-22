import { Hand } from "../hands/hand";
import { RoundResult } from "./roundResult";

/**
 * ラウンド結果計算機
 */
export class RoundResultCalculator {
  /**
   * 結果を計算する
   *
   * @param playersHand プレイヤーのハンド
   * @param dealersHand ディーラーのハンド
   * @returns ラウンドの結果
   */
  public calculate(playersHand: Hand, dealersHand: Hand): RoundResult {
    // プレイヤーがバスト
    if (playersHand.isBust()) {
      return RoundResult.Loss;
    }

    // プレイヤーがブラックジャック
    if (playersHand.isBlackJack()) {
      if (dealersHand.isBlackJack()) {
        return RoundResult.Push;
      } else {
        return RoundResult.Win;
      }
    }

    // プレイヤーがブラックジャック以外の 21 以下
    if (dealersHand.isBust()) {
      return RoundResult.Win;
    }
    if (dealersHand.isBlackJack()) {
      return RoundResult.Loss;
    }

    const playerTotal = playersHand.calculateTotal();
    const dealerTotal = dealersHand.calculateTotal();
    if (playerTotal > dealerTotal) {
      return RoundResult.Win;
    } else if (playerTotal === dealerTotal) {
      return RoundResult.Push;
    } else {
      return RoundResult.Loss;
    }
  }
}
