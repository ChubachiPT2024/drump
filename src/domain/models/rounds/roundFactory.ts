import { DealerId } from "../dealers/dealerId";
import { PlayerId } from "../players/playerId";
import { ShoeId } from "../shoes/shoeId";
import { Round } from "./round";

/**
 * ラウンドファクトリ
 */
export interface RoundFactory {
  /**
   * ラウンドを生成する
   *
   * @param shoeId シュー ID
   * @param dealerId ディーラー ID
   * @param playerId プレイヤー ID
   */
  create(shoeId: ShoeId, dealerId: DealerId, playerId: PlayerId): Round;
}
