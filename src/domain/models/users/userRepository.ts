import { User } from "./user";
import { UserId } from "./userId";

/**
 * ユーザリポジトリ
 */
export interface UserRepository {
  /**
   * ユーザを保存する
   *
   * @param user ユーザ
   */
  saveAsync(user: User): Promise<void>;

  /**
   * ユーザを検索する
   *
   * @param id ID
   * @returns ユーザ
   */
  findAsync(id: UserId): Promise<User>;

  /**
   * ユーザを全件取得する
   *
   * @returns ユーザリスト
   */
  findAllAsync(): Promise<User[]>;
}
