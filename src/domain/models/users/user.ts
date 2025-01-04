import { UserId } from "./userId";
import { UserName } from "./userName";

/**
 * ユーザ
 */
export class User {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param name 名前
   */
  public constructor(
    public readonly id: UserId,
    public readonly name: UserName,
  ) {}
}
