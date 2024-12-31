import { ChipAmount } from "../chipAmounts/chipAmount";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
import { UserId } from "../users/userId";
import { PlayerId } from "./playerId";

/**
 * プレイヤー通知
 */
export interface PlayerNotification {
  /**
   * ID を通知する
   *
   * @param id ID
   */
  notifyId(id: PlayerId): void;

  /**
   * ユーザ ID を通知する
   *
   * @param userId ユーザ ID
   */
  notifyUserId(userId: UserId): void;

  /**
   * ハンドを通知する
   *
   * @param hand ハンド
   */
  notifyHand(hand: Hand): void;

  /**
   * ハンドシグナルの選択肢を通知する
   *
   * @param handSignalOptions ハンドシグナルの選択肢
   */
  notifyHandSignalOptions(handSignalOptions: HandSignal[]): void;

  /**
   * クレジットを通知する
   *
   * @param credit クレジット
   */
  notifyCredit(credit: ChipAmount): void;

  /**
   * ベット額を通知する
   *
   * @param betAmount ベット額
   */
  notifyBetAmount(betAmount: ChipAmount): void;
}
