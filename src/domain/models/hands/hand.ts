import { Card } from "../cards/card";

/**
 * ハンド
 */
export class Hand {
  /**
   * コンストラクタ
   *
   * @param cards カード
   * @param isStand スタンドしているかどうか
   */
  public constructor(
    private readonly cards: Card[],
    private readonly isStand: boolean,
  ) {}

  /**
   * カードを追加する
   *
   * @param card カード
   * @returns カードを追加した新しいハンド
   */
  public add(card: Card): Hand {
    return new Hand([...this.cards, card], this.isStand);
  }

  /**
   * ソフトトータルを計算する
   *
   * @returns ソフトトータル
   */
  public calculateSoftTotal(): number {
    return this.cards
      .map((card) => card.getSoftPoint())
      .reduce((sum, point) => (sum += point), 0);
  }

  /**
   * ハードトータルを計算する
   *
   * @returns ハードトータル
   */
  public calculateHardTotal(): number {
    return this.cards
      .map((card) => card.getHardPoint())
      .reduce((sum, point) => (sum += point), 0);
  }

  /**
   * 枚数を数える
   *
   * @returns 枚数
   */
  public count(): number {
    return this.cards.length;
  }

  /**
   * ブラックジャックかどうか判定する
   *
   * @returns ブラックジャックかどうか
   */
  public isBlackJack(): boolean {
    // 枚数が 2 枚の場合、ハードトータルが 21 以上になることはあり得ない
    return this.count() === 2 && this.calculateSoftTotal() === 21;
  }

  /**
   * バストかどうか判定する
   *
   * @returns バストかどうか
   */
  public isBust(): boolean {
    // ハードトータルの方がソフトトータルよりも常に小さい
    return this.calculateHardTotal() > 21;
  }

  /**
   * ヒットできるかどうか判定する
   *
   * @returns ヒットできるかどうか
   */
  public canHit(): boolean {
    return (
      !this.isStand &&
      this.calculateSoftTotal() !== 21 &&
      this.calculateHardTotal() < 21
    );
  }

  /**
   * スタンドする
   *
   * @returns スタンドした新しいハンド
   */
  public stand(): Hand {
    return new Hand([...this.cards], true);
  }

  /**
   * ハンドが決まったかどうかを取得する
   *
   * @returns ハンドが決まったかどうか
   */
  public isResolved(): boolean {
    return (
      this.calculateSoftTotal() === 21 ||
      this.calculateHardTotal() === 21 ||
      this.isStand ||
      this.isBust()
    );
  }
}
