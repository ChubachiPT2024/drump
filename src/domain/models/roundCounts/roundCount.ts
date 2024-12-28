import { RoundCountExceedsMaximumError } from "./roundCountExceedsMaximumError";

/**
 * ラウンド数
 */
export class RoundCount {
  /**
   * 最大ラウンド数
   */
  private static readonly MAX_ROUND_COUNT = 10;

  /**
   * ラウンド数 0
   */
  public static readonly ZERO = new RoundCount(0);

  /**
   * コンストラクタ
   *
   * @param value 値
   */
  private constructor(public readonly value: number) {
    if (this.value > RoundCount.MAX_ROUND_COUNT) {
      throw new RoundCountExceedsMaximumError();
    }
  }

  /**
   * ラウンド数を増やした新しいインスタンスを生成する
   *
   * @returns ラウンド数を増やした新しいインスタンス
   */
  public increment(): RoundCount {
    return new RoundCount(this.value + 1);
  }
}
