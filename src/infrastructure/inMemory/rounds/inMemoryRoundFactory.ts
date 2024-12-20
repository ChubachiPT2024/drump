import { DealerId } from "@/domain/models/dealers/dealerId";
import { PlayerId } from "@/domain/models/players/playerId";
import { Round } from "@/domain/models/rounds/round";
import { RoundFactory } from "@/domain/models/rounds/roundFactory";
import { RoundId } from "@/domain/models/rounds/roundId";

/**
 * インメモリラウンドファクトリ
 */
export class InMemoryRoundFactory implements RoundFactory {
  /**
   * ラウンドを生成する
   *
   * @param dealerId ディーラー ID
   * @param playerId プレイヤー ID
   * @returns ラウンド
   */
  public create(dealerId: DealerId, playerId: PlayerId): Round {
    return new Round(new RoundId(crypto.randomUUID()), dealerId, playerId);
  }
}
