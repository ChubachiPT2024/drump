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
   * @returns ラウンド
   */
  public create(shoeId: ShoeId): Round {
    return Round.create(new RoundId(crypto.randomUUID()), shoeId);
  }
}
