import { User } from "@/domain/models/users/user";
import { UserId } from "@/domain/models/users/userId";
import { UserRepository } from "@/domain/models/users/userRepository";

/**
 * インメモリユーザリポジトリ
 */
export class InMemoryUserRepository implements UserRepository {
  /**
   * ユーザ
   *
   * キーは厳密等価で判定されるので、プリミティブ型を使用する
   */
  private readonly users = new Map<string, User>();

  /**
   * ユーザを保存する
   *
   * @param user ユーザ
   */
  public async saveAsync(user: User): Promise<void> {
    this.users.set(user.id.value, user);
  }

  /**
   * ユーザを検索する
   *
   * @param id ID
   * @returns ユーザ
   */
  public async findAsync(id: UserId): Promise<User> {
    const user = this.users.get(id.value);
    if (!user) {
      throw new Error("The user is not found.");
    }
    return user;
  }

  /**
   * ユーザを全件取得する
   *
   * @returns ユーザリスト
   */
  public async findAllAsync(): Promise<User[]> {
    return [...this.users.values()];
  }
}
