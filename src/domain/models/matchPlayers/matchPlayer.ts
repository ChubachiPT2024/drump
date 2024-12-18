import { ChipAmount } from "../chipAmounts/chipAmount";
import { Credit } from "../credits/credit";

/**
 * マッチプレイヤー
 */
export class MatchPlayer {
  /**
   * コンストラクタ
   *
   * @param credit クレジット
   */
  private constructor(private credit: Credit) {}

  /**
   * インスタンスを生成する
   *
   * @returns インスタンス
   */
  public static create(): MatchPlayer {
    // TODO クレジットの初期値
    return new MatchPlayer(new Credit(new ChipAmount(50000)));
  }

  /**
   * クレジットにチップを預ける
   *
   * @param chipAmount チップ量
   */
  public depositToCredit(chipAmount: ChipAmount): void {
    this.credit = this.credit.deposit(chipAmount);
  }

  /**
   * クレジットからチップを引き出す
   *
   * @param chipAmount チップ量
   */
  public withdrawFromCredit(chipAmount: ChipAmount): void {
    this.credit = this.credit.withdraw(chipAmount);
  }

  /**
   * クレジットを取得する
   *
   * @returns クレジット
   */
  public getCredit(): Credit {
    return this.credit;
  }
}
