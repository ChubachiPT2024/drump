import { DealerId } from "@/domain/models/dealers/dealerId";
import { Round } from "@/domain/models/rounds/round";
import { RoundFactory } from "@/domain/models/rounds/roundFactory";
import { RoundId } from "@/domain/models/rounds/roundId";
import { ShoeId } from "@/domain/models/shoes/shoeId";

/**
 * インメモリラウンドファクトリ
 */
export class InMemoryRoundFactory implements RoundFactory {
  /**
   * ラウンドを生成する
   *
   * @param shoeId シュー ID
   * @param dealerId ディーラー ID
   * @returns ラウンド
   */
  public create(shoeId: ShoeId, dealerId: DealerId): Round {
    return Round.create(new RoundId(crypto.randomUUID()), shoeId, dealerId);
  }
}
