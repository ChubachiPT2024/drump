import { UserId } from "./userId";

/**
 * ユーザ
 */
export class User {
  /**
   * コンストラクタ
   *
   * @param id ID
   */
  private constructor(public readonly id: UserId) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @returns インスタンス
   */
  public static create(id: UserId) {
    return new User(id);
  }
}
