import { User } from "@/domain/models/users/user";

/**
 * ユーザ全件取得結果のユーザ
 */
export class UserGetAllResultUser {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param name 名前
   */
  private constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param user ユーザ
   * @returns インスタンス
   */
  public static create(user: User): UserGetAllResultUser {
    return new UserGetAllResultUser(user.id.value, user.name.value);
  }
}
