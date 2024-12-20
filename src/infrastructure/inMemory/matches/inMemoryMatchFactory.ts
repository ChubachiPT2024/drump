import { Match } from "@/domain/models/matches/match";
import { MatchFactory } from "@/domain/models/matches/matchFactory";
import { MatchId } from "@/domain/models/matches/matchId";
import { PlayerFactory } from "@/domain/models/players/playerFactory";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { UserId } from "@/domain/models/users/userId";

/**
 * インメモリ試合ファクトリ
 */
export class InMemoryMatchFactory implements MatchFactory {
  /**
   * コンストラクタ
   *
   * @param playerFactory プレイヤーファクトリ
   */
  public constructor(private readonly playerFactory: PlayerFactory) {}

  /**
   * 試合を生成する
   *
   * @param shoeId シュー ID
   * @param userId ユーザ ID
   * @returns 試合
   */
  public create(shoeId: ShoeId, userId: UserId): Match {
    return Match.create(
      new MatchId(crypto.randomUUID()),
      shoeId,
      this.playerFactory.create(userId),
    );
  }
}
