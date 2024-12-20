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
   * @param dealerId ディーラー ID
   * @param playerId プレイヤー ID
   */
  public constructor(
    public readonly id: RoundId,
    public readonly dealerId: DealerId,
    public readonly playerId: PlayerId,
  ) {}
}
