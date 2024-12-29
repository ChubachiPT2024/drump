import { UserFactory } from "@/domain/models/users/userFactory";
import { UserRepository } from "@/domain/models/users/userRepository";
import { UserCreateCommand } from "./create/userCreateCommand";
import { UserCreateResult } from "./create/userCreateResult";
import { UserName } from "@/domain/models/users/userName";

/**
 * ユーザアプリケーションサービス
 */
export class UserApplicationService {
  /**
   * コンストラクタ
   *
   * @param userFactory ユーザファクトリ
   * @param userRepository ユーザリポジトリ
   */
  public constructor(
    private readonly userFactory: UserFactory,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * ユーザを生成する
   *
   * @param command ユーザ生成コマンド
   * @returns ユーザ生成結果
   */
  public async createAsync(
    command: UserCreateCommand,
  ): Promise<UserCreateResult> {
    const user = this.userFactory.create(new UserName(command.name));

    await this.userRepository.saveAsync(user);

    return new UserCreateResult(user.id.value);
  }
}
