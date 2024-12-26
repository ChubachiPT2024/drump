import { User } from "./user";

/**
 * ユーザファクトリ
 */
export interface UserFactory {
  /**
   * ユーザを生成する
   */
  create(): User;
}
