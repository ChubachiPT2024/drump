import { ChipAmountNegativeError } from "./chipAmountNegativeError";

/**
 * チップ量
 */
export class ChipAmount {
  /**
   * コンストラクタ
   *
   * @param value 値
   */
  public constructor(public readonly value: number) {
    if (this.value < 0) {
      throw new ChipAmountNegativeError();
    }
  }

  /**
   * このチップ量に別のチップ量を足した新しいチップ量を生成する
   *
   * @param other 別のチップ量
   * @returns このチップ量に別のチップ量を足した新しいチップ量
   */
  public plus(other: ChipAmount): ChipAmount {
    return new ChipAmount(this.value + other.value);
  }

  /**
   * このチップ量から別のチップ量を引けるかどうか判定する
   *
   * @param other 別のチップ量
   * @returns このチップ量から別のチップ量を引けるかどうか
   */
  public canMinus(other: ChipAmount): boolean {
    return this.value >= other.value;
  }

  /**
   * このチップ量から別のチップ量を引いた新しいチップ量を生成する
   *
   * @param other 別のチップ量
   * @returns このチップ量から別のチップ量を引いた新しいチップ量
   */
  public minus(other: ChipAmount): ChipAmount {
    if (!this.canMinus(other)) {
      throw new ChipAmountNegativeError();
    }

    return new ChipAmount(this.value - other.value);
  }

  /**
   * このチップ量にレートを掛けた新しいチップ量を生成する
   *
   * @param rate レート
   * @returns このチップ量にレートを掛けた新しいチップ量
   */
  public multiply(rate: number): ChipAmount {
    return new ChipAmount(rate * this.value);
  }
}
