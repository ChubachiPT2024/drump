import { ChipAmount } from "../chipAmounts/chipAmount";

/**
 * 収支
 */
export class Balance {
  /**
   * コンストラクタ
   *
   * @param value 値
   */
  public constructor(public readonly value: number) {}

  /**
   * インスタンスを生成する
   *
   * @param before 変化前のチップ量
   * @param after 変化後のチップ量
   * @returns インスタンス
   */
  public static create(before: ChipAmount, after: ChipAmount): Balance {
    return new Balance(after.value - before.value);
  }
}
