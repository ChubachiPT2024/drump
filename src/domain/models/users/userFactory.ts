import { User } from "./user";
import { UserName } from "./userName";

/**
 * ユーザファクトリ
 */
export interface UserFactory {
  /**
   * ユーザを生成する
   *
   * @param name 名前
   */
  create(name: UserName): User;
}
