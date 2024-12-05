import { MatchFactory } from "@/domain/models/matches/matchFactory";
import { MatchRepository } from "@/domain/models/matches/matchRepository";
import { MatchCreateCommand } from "./matchCreateCommand";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { MatchCreateResult } from "./matchCreateResult";
import { MatchAddRoundCommand } from "./matchAddRoundCommand";
import { MatchId } from "@/domain/models/matches/matchId";
import { RoundId } from "@/domain/models/rounds/roundId";

/**
 * 試合アプリケーションサービス
 */
export class MatchApplicationService {
  /**
   * コンストラクタ
   *
   * @param matchFactory 試合ファクトリ
   * @param matchRepository 試合リポジトリ
   */
  public constructor(
    private readonly matchFactory: MatchFactory,
    private readonly matchRepository: MatchRepository,
  ) {}

  /**
   * 試合を生成する
   *
   * @param command 試合生成コマンド
   * @returns 試合生成結果
   */
  public async createAsync(
    command: MatchCreateCommand,
  ): Promise<MatchCreateResult> {
    const match = this.matchFactory.create(new ShoeId(command.shodId));

    await this.matchRepository.saveAsync(match);

    return new MatchCreateResult(match.id.value);
  }

  /**
   * 試合にラウンドを追加する
   *
   * @param command 試合へのラウンド追加コマンド
   */
  public async addRoundAsync(command: MatchAddRoundCommand): Promise<void> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));
    match.addRound(new RoundId(command.roundId));
  }
}
