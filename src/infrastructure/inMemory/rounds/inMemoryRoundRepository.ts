import { Round } from "@/domain/models/rounds/round";
import { RoundId } from "@/domain/models/rounds/roundId";
import { RoundRepository } from "@/domain/models/rounds/roundRepository";

/**
 * インメモリラウンドリポジトリ
 */
export class InMemoryRoundRepository implements RoundRepository {
  /**
   * ラウンド
   *
   * キーは厳密等価で判定されるので、プリミティブ型を使用する
   */
  private readonly rounds = new Map<string, Round>();

  /**
   * ラウンドを保存する
   *
   * @param round ラウンド
   */
  public async saveAsync(round: Round): Promise<void> {
    this.rounds.set(round.id.value, round);
  }

  /**
   * ラウンドを検索する
   *
   * @param id ID
   * @returns ラウンド
   */
  public async findAsync(id: RoundId): Promise<Round> {
    const round = this.rounds.get(id.value);
    if (!round) {
      throw new Error("The round is not found.");
    }
    return round;
  }
}
