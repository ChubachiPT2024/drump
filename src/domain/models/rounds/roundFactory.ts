import { DealerId } from "../dealers/dealerId";
import { PlayerId } from "../players/playerId";
import { Round } from "./round";

/**
 * ラウンドファクトリ
 */
export interface RoundFactory {
  /**
   * ラウンドを生成する
   *
   * @param dealerId ディーラー ID
   * @param playerId プレイヤー ID
   */
  create(dealerId: DealerId, playerId: PlayerId): Round;
}
