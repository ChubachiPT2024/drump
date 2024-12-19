import { Player } from "@/domain/models/players/player";
import { PlayerId } from "@/domain/models/players/playerId";
import { PlayerRepository } from "@/domain/models/players/playerRepository";

/**
 * インメモリプレイヤーリポジトリ
 */
export class InMemoryPlayerRepository implements PlayerRepository {
  /**
   * プレイヤー
   *
   * キーは厳密等価で判定されるので、プリミティブ型を使用する
   */
  private readonly players = new Map<string, Player>();

  /**
   * プレイヤーを保存する
   *
   * @param player プレイヤー
   */
  public async saveAsync(player: Player): Promise<void> {
    this.players.set(player.id.value, player);
  }

  /**
   * プレイヤーを検索する
   *
   * @param id ID
   * @returns プレイヤー
   */
  public async findAsync(id: PlayerId): Promise<Player> {
    const player = this.players.get(id.value);
    if (!player) {
      throw new Error("The player is not found.");
    }
    return player;
  }
}
