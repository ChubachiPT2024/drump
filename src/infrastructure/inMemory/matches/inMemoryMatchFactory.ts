import { DealerFactory } from "@/domain/models/dealers/dealerFactory";
import { Match } from "@/domain/models/matches/match";
import { MatchFactory } from "@/domain/models/matches/matchFactory";
import { MatchId } from "@/domain/models/matches/matchId";
import { PlayerFactory } from "@/domain/models/players/playerFactory";
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
  public constructor(
    private readonly dealerFactory: DealerFactory,
    private readonly playerFactory: PlayerFactory,
  ) {}

  /**
   * 試合を生成する
   *
   * @param userIds ユーザ ID
   * @returns 試合
   */
  public create(userIds: UserId[]): Match {
    return Match.create(
      new MatchId(crypto.randomUUID()),
      this.dealerFactory.create(),
      userIds.map((userId) => this.playerFactory.create(userId)),
    );
  }
}
