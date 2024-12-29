import { User } from "@/domain/models/users/user";
import { UserFactory } from "@/domain/models/users/userFactory";
import { UserId } from "@/domain/models/users/userId";
import { UserName } from "@/domain/models/users/userName";

/**
 * インメモリユーザファクトリ
 */
export class InMemoryUserFactory implements UserFactory {
  /**
   * ユーザを生成する
   *
   * @param name 名前
   */
  public create(name: UserName): User {
    return new User(new UserId(crypto.randomUUID()), name);
  }
}
