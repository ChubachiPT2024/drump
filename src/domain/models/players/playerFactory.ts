import { UserId } from "../users/userId";
import { Player } from "./player";

/**
 * プレイヤーファクトリ
 */
export interface PlayerFactory {
  /**
   * プレイヤーを生成する
   *
   * @param userId ユーザ ID
   */
  create(userId: UserId): Player;
}
