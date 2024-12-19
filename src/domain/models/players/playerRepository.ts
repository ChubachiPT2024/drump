import { Player } from "./player";
import { PlayerId } from "./playerId";

/**
 * プレイヤーリポジトリ
 */
export interface PlayerRepository {
  /**
   * プレイヤーを保存する
   *
   * @param player プレイヤー
   */
  saveAsync(player: Player): Promise<void>;

  /**
   * プレイヤーを検索する
   *
   * @param id ID
   * @returns プレイヤー
   */
  findAsync(id: PlayerId): Promise<Player>;
}
