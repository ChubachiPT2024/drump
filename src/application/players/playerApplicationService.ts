import { PlayerFactory } from "@/domain/models/players/playerFactory";
import { PlayerRepository } from "@/domain/models/players/playerRepository";
import { PlayerCreateCommand } from "./Create/playerCreateCommand";
import { PlayerCreateResult } from "./Create/playerCreateResult";
import { UserId } from "@/domain/models/users/userId";
import { PlayerGetHandCommand } from "./GetHand/playerGetHandCommand";
import { PlayerGetHandResult } from "./GetHand/playerGetHandResult";
import { PlayerId } from "@/domain/models/players/playerId";
import { PlayerGetHandResultCard } from "./GetHand/playerGetHandResultCard";
import { PlayerGetHandSignalOptionsCommand } from "./GetHandSignalOptions/playerGetHandSignalOptionsCommand";
import { PlayerGetHandSignalOptionsResult } from "./GetHandSignalOptions/playerGetHandSignalOptionsResult";

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

  /**
   * ハンドを取得する
   *
   * @param command ハンド取得コマンド
   * @returns ハンド取得結果
   */
  public async getHandAsync(
    command: PlayerGetHandCommand,
  ): Promise<PlayerGetHandResult> {
    const player = await this.playerRepository.findAsync(
      new PlayerId(command.id),
    );

    const playersHand = player.getHand();

    return new PlayerGetHandResult(
      playersHand.getCards().map((card) => new PlayerGetHandResultCard(card)),
      playersHand.calculateTotal(),
      playersHand.isResolved(),
    );
  }

  /**
   * ハンドシグナルの選択肢を取得する
   *
   * @param command ハンドシグナルの選択肢取得コマンド
   * @returns ハンドシグナルの選択肢取得結果
   */
  public async getHandSignalOptionsAsync(
    command: PlayerGetHandSignalOptionsCommand,
  ): Promise<PlayerGetHandSignalOptionsResult> {
    const player = await this.playerRepository.findAsync(
      new PlayerId(command.id),
    );

    return new PlayerGetHandSignalOptionsResult(player.getHandSignalOptions());
  }
}
