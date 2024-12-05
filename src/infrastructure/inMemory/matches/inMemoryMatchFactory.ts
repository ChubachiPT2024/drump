import { Match } from "@/domain/models/matches/match";
import { MatchFactory } from "@/domain/models/matches/matchFactory";
import { MatchId } from "@/domain/models/matches/matchId";
import { ShoeId } from "@/domain/models/shoes/shoeId";

/**
 * インメモリ試合ファクトリ
 */
export class InMemoryMatchFactory implements MatchFactory {
  /**
   * 試合を生成する
   *
   * @param shoeId シュー ID
   * @returns 試合
   */
  public create(shoeId: ShoeId): Match {
    return new Match(new MatchId(crypto.randomUUID()), shoeId, []);
  }
}
