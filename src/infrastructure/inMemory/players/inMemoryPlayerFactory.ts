import { Player } from "@/domain/models/players/player";
import { PlayerFactory } from "@/domain/models/players/playerFactory";
import { UserId } from "@/domain/models/users/userId";

/**
 * インメモリプレイヤーファクトリ
 */
export class InMemoryPlayerFactory implements PlayerFactory {
  /**
   * プレイヤーを生成する
   *
   * @param userId ユーザ ID
   * @returns プレイヤー
   */
  public create(userId: UserId): Player {
    return Player.create(new UserId(crypto.randomUUID()), userId);
  }
}
