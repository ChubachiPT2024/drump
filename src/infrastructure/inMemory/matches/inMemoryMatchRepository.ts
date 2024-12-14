import { Match } from "@/domain/models/matches/match";
import { MatchId } from "@/domain/models/matches/matchId";
import { MatchRepository } from "@/domain/models/matches/matchRepository";

/**
 * インメモリ試合リポジトリ
 */
export class InMemoryMatchRepository implements MatchRepository {
  /**
   * 試合
   *
   * キーは厳密等価で判定されるので、プリミティブ型を使用する
   */
  private readonly matches = new Map<string, Match>();

  /**
   * 試合を保存する
   *
   * @param match 試合
   */
  public async saveAsync(match: Match): Promise<void> {
    this.matches.set(match.id.value, match);
  }

  /**
   * 試合を検索する
   *
   * @param id ID
   * @returns 試合
   */
  public async findAsync(id: MatchId): Promise<Match> {
    const match = this.matches.get(id.value);
    if (!match) {
      throw new Error("The match is not found.");
    }
    return match;
  }
}
