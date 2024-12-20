import { MatchFactory } from "@/domain/models/matches/matchFactory";
import { MatchRepository } from "@/domain/models/matches/matchRepository";
import { MatchCreateCommand } from "./Create/matchCreateCommand";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { MatchCreateResult } from "./Create/matchCreateResult";
import { MatchAddRoundCommand } from "./AddRound/matchAddRoundCommand";
import { MatchId } from "@/domain/models/matches/matchId";
import { RoundId } from "@/domain/models/rounds/roundId";
import { UserId } from "@/domain/models/users/userId";
import { MatchGetSummaryCommand } from "./GetSummary/matchGetSummaryCommand";
import { MatchGetSummaryResult } from "./GetSummary/matchGetSummaryResult";

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
    const match = this.matchFactory.create(
      new ShoeId(command.shodId),
      new UserId(command.userId),
    );

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

  /**
   * サマリを取得する
   *
   * @param command サマリ取得コマンド
   * @returns サマリ取得結果
   */
  public async getSummaryAsync(
    command: MatchGetSummaryCommand,
  ): Promise<MatchGetSummaryResult> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    const result = new MatchGetSummaryResult();
    match.notify(result);

    return result;
  }
}
