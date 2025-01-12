import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";

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
  private constructor(
    private readonly cards: Card[],
    private readonly isStand: boolean,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @returns インスタンス
   */
  public static create(): Hand {
    return new Hand([], false);
  }

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
   * @returns ソフトトータル。定義されない場合は undefined
   */
  public calculateSoftTotal(): number | undefined {
    if (!this.cards.some((card) => card.rank === Rank.Ace)) {
      return undefined;
    }

    // 11 点として数えられるエースは高々 1 枚
    //（2 枚を 11 点として数えると、その時点で 22 になる）
    const softTotal = this.calculateHardTotal() + 10;

    return softTotal <= 21 ? softTotal : undefined;
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
   * トータルを計算する
   *
   * @returns トータル
   */
  public calculateTotal(): number {
    // ソフトトータルが定義できる場合、ソフトトータルの方が常に大きい
    return this.calculateSoftTotal() ?? this.calculateHardTotal();
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
    return this.count() === 2 && this.calculateTotal() === 21;
  }

  /**
   * バストかどうか判定する
   *
   * @returns バストかどうか
   */
  public isBust(): boolean {
    return this.calculateTotal() > 21;
  }

  /**
   * ヒットできるかどうか判定する
   *
   * @returns ヒットできるかどうか
   */
  public canHit(): boolean {
    return !this.isResolved();
  }

  /**
   * スプリットできるかどうか判定する
   *
   * @returns スプリットできるかどうか
   */
  public canSplit(): boolean {
    return (
      this.count() === 2 &&
      this.cards[0].getHardPoint() === this.cards[1].getHardPoint()
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
    return this.calculateTotal() === 21 || this.isStand || this.isBust();
  }

  /**
   * カードを取得する
   *
   * @returns カード
   */
  public getCards(): Card[] {
    return [...this.cards];
  }
}
