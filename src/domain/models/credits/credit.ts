import { ChipAmount } from "../chipAmounts/chipAmount";
import { CreditCannotWithdrawError } from "./creditCannotWithdrawError";

/**
 * クレジット
 */
export class Credit {
  /**
   * コンストラクタ
   *
   * @param chipAmount チップ量
   */
  public constructor(public readonly chipAmount: ChipAmount) {}

  /**
   * チップを預けた新しいクレジットを生成する
   *
   * @param depositAmount 預けるチップ量
   * @returns チップを預けた新しいクレジット
   */
  public deposit(depositChipAmount: ChipAmount): Credit {
    return new Credit(this.chipAmount.plus(depositChipAmount));
  }

  /**
   * チップを引き出せるかどうかを取得する
   *
   * @param withdrawChipAmount 引き出すチップ量
   */
  public canWithdraw(withdrawChipAmount: ChipAmount): boolean {
    return this.chipAmount.canMinus(withdrawChipAmount);
  }

  /**
   * チップを引き出した新しいクレジットを生成する
   *
   * @param withdrawChipAmount 引き出すチップ量
   * @returns チップを引き出した新しいクレジット
   */
  public withdraw(withdrawChipAmount: ChipAmount): Credit {
    if (!this.canWithdraw(withdrawChipAmount)) {
      throw new CreditCannotWithdrawError();
    }

    return new Credit(this.chipAmount.minus(withdrawChipAmount));
  }
}
