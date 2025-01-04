import { User } from "@/domain/models/users/user";
import { UserGetAllResultUser } from "./userGetAllResultUser";

/**
 * ユーザ全件取得結果
 */
export class UserGetAllResult {
  /**
   * コンストラクタ
   *
   * @param users ユーザ
   */
  private constructor(public readonly users: UserGetAllResultUser[]) {}

  /**
   * インスタンスを生成する
   *
   * @param users ユーザリスト
   * @returns インスタンス
   */
  public static create(users: User[]): UserGetAllResult {
    return new UserGetAllResult(
      users.map((user) => UserGetAllResultUser.create(user)),
    );
  }
}
