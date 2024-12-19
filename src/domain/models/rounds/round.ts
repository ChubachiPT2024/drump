import { ShoeId } from "../shoes/shoeId";
import { RoundId } from "./roundId";
import { DealerId } from "../dealers/dealerId";
import { PlayerId } from "../players/playerId";

/**
 * ラウンド
 */
export class Round {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param shoeId シュー ID
   * @param dealerId ディーラー ID
   * @param playerId プレイヤー ID
   */
  public constructor(
    public readonly id: RoundId,
    public readonly shoeId: ShoeId,
    public readonly dealerId: DealerId,
    public readonly playerId: PlayerId,
  ) {}
}
