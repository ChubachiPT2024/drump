import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";

/**
 * カード
 */
export class Card {
   /**
   * ソフトハンドにおける点数
   */
   private static readonly softPoints = {
    [Rank.Ace]: 11,
    [Rank.Two]: 2,
    [Rank.Three]: 3,
    [Rank.Four]: 4,
    [Rank.Five]: 5,
    [Rank.Six]: 6,
    [Rank.Seven]: 7,
    [Rank.Eight]: 8,
    [Rank.Nine]: 9,
    [Rank.Ten]: 10,
    [Rank.Jack]: 10,
    [Rank.Queen]: 10,
    [Rank.King]: 10,
  };

  /**
   * ソフトハンドにおける点数
   */
  private static readonly softPoints = {
    [Rank.Ace]: 11,
    [Rank.Two]: 2,
    [Rank.Three]: 3,
    [Rank.Four]: 4,
    [Rank.Five]: 5,
    [Rank.Six]: 6,
    [Rank.Seven]: 7,
    [Rank.Eight]: 8,
    [Rank.Nine]: 9,
    [Rank.Ten]: 10,
    [Rank.Jack]: 10,
    [Rank.Queen]: 10,
    [Rank.King]: 10,
  };

  /**
   * ハードハンドにおける点数
   */
  private static readonly hardPoints = {
    [Rank.Ace]: 1,
    [Rank.Two]: 2,
    [Rank.Three]: 3,
    [Rank.Four]: 4,
    [Rank.Five]: 5,
    [Rank.Six]: 6,
    [Rank.Seven]: 7,
    [Rank.Eight]: 8,
    [Rank.Nine]: 9,
    [Rank.Ten]: 10,
    [Rank.Jack]: 10,
    [Rank.Queen]: 10,
    [Rank.King]: 10,
  };

  /**
   * コンストラクタ
   *
   * @param rank ランク
   * @param suit スート
   */
  public constructor(
    public readonly rank: Rank,
    public readonly suit: Suit,
  ) {}

  /**
   * ソフトハンドにおける点数を取得する
   *
   * @returns ソフトハンドにおける点数
   */
  public getSoftPoint(): number {
    return Card.softPoints[this.rank];
  }

  /**
   * ハードハンドにおける点数を取得する
   *
   * @returns ハードハンドにおける点数
   */
  public getHardPoint(): number {
    return Card.hardPoints[this.rank];
  }

  /**
   * このカードが他のカードと等価かどうか判定する
   *
   * @param other 他のカード
   * @returns このカードが他のカードと等価かどうか
   */
  public equals(other: Card): boolean {
    return this.rank === other.rank && this.suit === other.suit;
  }
}
