import { Match } from "@/domain/models/matches/match";
import { MatchFactory } from "@/domain/models/matches/matchFactory";
import { MatchId } from "@/domain/models/matches/matchId";
import { PlayerId } from "@/domain/models/players/playerId";
import { ShoeId } from "@/domain/models/shoes/shoeId";

/**
 * インメモリ試合ファクトリ
 */
export class InMemoryMatchFactory implements MatchFactory {
  /**
   * 試合を生成する
   *
   * @param shoeId シュー ID
   * @param playerId プレイヤー ID
   * @returns 試合
   */
  public create(shoeId: ShoeId, playerId: PlayerId): Match {
    return Match.create(new MatchId(crypto.randomUUID()), shoeId, playerId);
  }
}
