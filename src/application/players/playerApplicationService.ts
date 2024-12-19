import { PlayerFactory } from "@/domain/models/players/playerFactory";
import { PlayerRepository } from "@/domain/models/players/playerRepository";
import { PlayerCreateCommand } from "./Create/playerCreateCommand";
import { PlayerCreateResult } from "./Create/playerCreateResult";
import { UserId } from "@/domain/models/users/userId";

/**
 * プレイヤーアプリケーションサービス
 */
export class PlayerApplicationService {
  /**
   * コンストラクタ
   *
   * @param playerFactory プレイヤーファクトリ
   * @param playerRepository プレイヤーリポジトリ
   */
  public constructor(
    private readonly playerFactory: PlayerFactory,
    private readonly playerRepository: PlayerRepository,
  ) {}

  /**
   * プレイヤーを生成する
   *
   * @param command プレイヤー生成コマンド
   * @returns プレイヤー生成結果
   */
  public async createAsync(
    command: PlayerCreateCommand,
  ): Promise<PlayerCreateResult> {
    const player = this.playerFactory.create(new UserId(command.userId));

    await this.playerRepository.saveAsync(player);

    return new PlayerCreateResult(player.id.value);
  }
}
