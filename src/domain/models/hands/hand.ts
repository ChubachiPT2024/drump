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
  private calculateSoftTotal(): number {
    return this.cards
      .map((card) => card.getSoftPoint())
      .reduce((sum, point) => (sum += point), 0);
  }

  /**
   * トータルを計算する
   *
   * @returns トータル
   */
  public calculateTotal(): number {
    let total = this.calculateSoftTotal();
    let numSoftAce = this.cards.filter((card) => card.rank === Rank.Ace).length;

    // トータルが 21 を超えている場合、エースを 1 枚ずつ 11 点から 1 点に変える
    // 数式的には一発で計算できそうだが、演算誤差の問題があるので、とりあえず愚直に計算
    while (total > 21 && numSoftAce > 0) {
      total -= 10;
      numSoftAce--;
    }

    return total;
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
