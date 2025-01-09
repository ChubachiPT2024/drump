import { Card } from "../cards/card";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
import { Rank } from "../ranks/rank";

/**
 * ベーシックストラテジー計算機
 */
export class BasicStrategyCalculator {
  /**
   * ハードハンドストラテジー
   * 1 つ目の Key はハードトータル（8 以上 17 以下にクランプしたもの）
   * 2 つ目の Key はディーラーのアップカードのランク
   */
  private static readonly hardHandStrategies = new Map<
    number,
    Map<Rank, HandSignal>
  >([
    [
      8,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Hit],
        [Rank.Three, HandSignal.Hit],
        [Rank.Four, HandSignal.Hit],
        [Rank.Five, HandSignal.Hit],
        [Rank.Six, HandSignal.Hit],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      9,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Hit],
        [Rank.Three, HandSignal.Double],
        [Rank.Four, HandSignal.Double],
        [Rank.Five, HandSignal.Double],
        [Rank.Six, HandSignal.Double],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      10,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Hit],
        [Rank.Three, HandSignal.Double],
        [Rank.Four, HandSignal.Double],
        [Rank.Five, HandSignal.Double],
        [Rank.Six, HandSignal.Double],
        [Rank.Seven, HandSignal.Double],
        [Rank.Eight, HandSignal.Double],
        [Rank.Nine, HandSignal.Double],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      11,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Double],
        [Rank.Three, HandSignal.Double],
        [Rank.Four, HandSignal.Double],
        [Rank.Five, HandSignal.Double],
        [Rank.Six, HandSignal.Double],
        [Rank.Seven, HandSignal.Double],
        [Rank.Eight, HandSignal.Double],
        [Rank.Nine, HandSignal.Double],
        [Rank.Ten, HandSignal.Double],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      12,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Hit],
        [Rank.Three, HandSignal.Hit],
        [Rank.Four, HandSignal.Stand],
        [Rank.Five, HandSignal.Stand],
        [Rank.Six, HandSignal.Stand],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      13,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Stand],
        [Rank.Three, HandSignal.Stand],
        [Rank.Four, HandSignal.Stand],
        [Rank.Five, HandSignal.Stand],
        [Rank.Six, HandSignal.Stand],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      14,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Stand],
        [Rank.Three, HandSignal.Stand],
        [Rank.Four, HandSignal.Stand],
        [Rank.Five, HandSignal.Stand],
        [Rank.Six, HandSignal.Stand],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      15,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Stand],
        [Rank.Three, HandSignal.Stand],
        [Rank.Four, HandSignal.Stand],
        [Rank.Five, HandSignal.Stand],
        [Rank.Six, HandSignal.Stand],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      16,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Stand],
        [Rank.Three, HandSignal.Stand],
        [Rank.Four, HandSignal.Stand],
        [Rank.Five, HandSignal.Stand],
        [Rank.Six, HandSignal.Stand],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      17,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Stand],
        [Rank.Three, HandSignal.Stand],
        [Rank.Four, HandSignal.Stand],
        [Rank.Five, HandSignal.Stand],
        [Rank.Six, HandSignal.Stand],
        [Rank.Seven, HandSignal.Stand],
        [Rank.Eight, HandSignal.Stand],
        [Rank.Nine, HandSignal.Stand],
        [Rank.Ten, HandSignal.Stand],
        [Rank.Ace, HandSignal.Stand],
      ]),
    ],
  ]);

  /**
   * ソフトハンドストラテジー
   * 1 つ目の Key はソフトトータル（13 以上 19 以下にクランプしたもの）
   * 2 つ目の Key はディーラーのアップカードのランク
   */
  private static readonly softHandStrategies = new Map<
    number,
    Map<Rank, HandSignal>
  >([
    [
      19,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Stand],
        [Rank.Three, HandSignal.Stand],
        [Rank.Four, HandSignal.Stand],
        [Rank.Five, HandSignal.Stand],
        [Rank.Six, HandSignal.Stand],
        [Rank.Seven, HandSignal.Stand],
        [Rank.Eight, HandSignal.Stand],
        [Rank.Nine, HandSignal.Stand],
        [Rank.Ten, HandSignal.Stand],
        [Rank.Ace, HandSignal.Stand],
      ]),
    ],
    [
      18,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Stand],
        [Rank.Three, HandSignal.Double],
        [Rank.Four, HandSignal.Double],
        [Rank.Five, HandSignal.Double],
        [Rank.Six, HandSignal.Double],
        [Rank.Seven, HandSignal.Stand],
        [Rank.Eight, HandSignal.Stand],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      17,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Hit],
        [Rank.Three, HandSignal.Double],
        [Rank.Four, HandSignal.Double],
        [Rank.Five, HandSignal.Double],
        [Rank.Six, HandSignal.Double],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      16,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Hit],
        [Rank.Three, HandSignal.Hit],
        [Rank.Four, HandSignal.Double],
        [Rank.Five, HandSignal.Double],
        [Rank.Six, HandSignal.Double],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      15,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Hit],
        [Rank.Three, HandSignal.Hit],
        [Rank.Four, HandSignal.Double],
        [Rank.Five, HandSignal.Double],
        [Rank.Six, HandSignal.Double],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      14,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Hit],
        [Rank.Three, HandSignal.Hit],
        [Rank.Four, HandSignal.Hit],
        [Rank.Five, HandSignal.Double],
        [Rank.Six, HandSignal.Double],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
    [
      13,
      new Map<Rank, HandSignal>([
        [Rank.Two, HandSignal.Hit],
        [Rank.Three, HandSignal.Hit],
        [Rank.Four, HandSignal.Hit],
        [Rank.Five, HandSignal.Double],
        [Rank.Six, HandSignal.Double],
        [Rank.Seven, HandSignal.Hit],
        [Rank.Eight, HandSignal.Hit],
        [Rank.Nine, HandSignal.Hit],
        [Rank.Ten, HandSignal.Hit],
        [Rank.Ace, HandSignal.Hit],
      ]),
    ],
  ]);

  public static calculate(hand: Hand, upCard: Card): HandSignal {
    // TODO スプリットストラテジー

    const softTotal = hand.calculateSoftTotal();
    if (softTotal) {
      return BasicStrategyCalculator.softHandStrategies
        .get(BasicStrategyCalculator.clamp(softTotal, 13, 19))!
        .get(upCard.rank)!;
    }

    return BasicStrategyCalculator.hardHandStrategies
      .get(BasicStrategyCalculator.clamp(hand.calculateHardTotal(), 8, 17))!
      .get(upCard.rank)!;
  }

  /**
   * 値を最小値以上最大値以下の範囲にクランプする
   *
   * @param value 値
   * @param min 最小値
   * @param max 最大値
   * @returns クランプされた値
   */
  private static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}
