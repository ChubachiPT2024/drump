import { PlayerNotification } from "@/domain/models/players/playerNotification";
import { Hand } from "@/domain/models/hands/hand";
import { PlayerId } from "@/domain/models/players/playerId";
import { MatchGetSummaryResultHand } from "./matchGetSummaryResultHand";
import { HandSignal } from "@/domain/models/handSignals/handSignal";
import { ChipAmount } from "@/domain/models/chipAmounts/chipAmount";
import { UserId } from "@/domain/models/users/userId";

/**
 * 試合サマリ取得結果のプレイヤー
 */
export class MatchGetSummaryResultPlayer implements PlayerNotification {
  /**
   * ID
   */
  public id?: string;

  /**
   * ユーザ ID
   */
  public userId?: string;

  /**
   * ハンド
   */
  public hand?: MatchGetSummaryResultHand;

  /**
   * ハンドシグナルの選択肢
   */
  public handSignalOptions: HandSignal[] = [];

  /**
   * クレジット
   */
  public credit?: number;

  /**
   * ベット額
   */
  public betAmount?: number;

  /**
   * ID を通知する
   *
   * @param id ID
   */
  public notifyId(id: PlayerId): void {
    this.id = id.value;
  }

  /**
   * ユーザ ID を通知する
   *
   * @param userId ユーザ ID
   */
  public notifyUserId(userId: UserId): void {
    this.userId = userId.value;
  }

  /**
   * ハンドを通知する
   *
   * @param hand ハンド
   */
  public notifyHand(hand: Hand): void {
    this.hand = MatchGetSummaryResultHand.create(hand);
  }

  /**
   * ハンドシグナルの選択肢を通知する
   *
   * @param handSignalOptions ハンドシグナルの選択肢
   */
  public notifyHandSignalOptions(handSignalOptions: HandSignal[]): void {
    this.handSignalOptions = handSignalOptions;
  }

  /**
   * クレジットを通知する
   *
   * @param credit クレジット
   */
  public notifyCredit(credit: ChipAmount): void {
    this.credit = credit.value;
  }

  /**
   * ベット額を通知する
   *
   * @param betAmount ベット額
   */
  public notifyBetAmount(betAmount: ChipAmount): void {
    this.betAmount = betAmount.value;
  }
}
