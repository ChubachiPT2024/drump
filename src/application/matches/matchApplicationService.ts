import { MatchFactory } from "@/domain/models/matches/matchFactory";
import { MatchRepository } from "@/domain/models/matches/matchRepository";
import { MatchCreateCommand } from "./Create/matchCreateCommand";
import { MatchCreateResult } from "./Create/matchCreateResult";
import { MatchId } from "@/domain/models/matches/matchId";
import { UserId } from "@/domain/models/users/userId";
import { MatchGetSummaryCommand } from "./GetSummary/matchGetSummaryCommand";
import { MatchGetSummaryResult } from "./GetSummary/matchGetSummaryResult";
import { MatchStartRoundCommand } from "./StartRound/matchStartCommand";
import { MatchHitCommand } from "./Hit/matchHitCommand";
import { MatchStandCommand } from "./Stand/matchStandCommand";
import { MatchCannotHitError } from "./Hit/matchCannotHitError";
import { MatchCompleteRoundCommand } from "./CompleteRound/matchCompleteRoundCommand";
import { MatchGetRoundResultCommand } from "./GetRoundResult/matchGetRoundResult";
import { MatchGetRoundResultResult } from "./GetRoundResult/matchGetRoundResultResult";
import { RoundService } from "@/domain/services/roundService";
import { MatchBetCommand } from "./Bet/matchBetCommand";
import { ChipAmount } from "@/domain/models/chipAmounts/chipAmount";

/**
 * 試合アプリケーションサービス
 */
export class MatchApplicationService {
  /**
   * コンストラクタ
   *
   * @param matchFactory 試合ファクトリ
   * @param matchRepository 試合リポジトリ
   * @param roundService ラウンドサービス
   */
  public constructor(
    private readonly matchFactory: MatchFactory,
    private readonly matchRepository: MatchRepository,
    private readonly roundService: RoundService,
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
    const match = this.matchFactory.create(new UserId(command.userId));

    await this.matchRepository.saveAsync(match);

    return new MatchCreateResult(match.id.value);
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

  /**
   * ラウンドを開始する
   *
   * @param command ラウンド開始コマンド
   */
  public async startRoundAsync(command: MatchStartRoundCommand): Promise<void> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    // TODO ラウンドに関する検証と更新

    for (let i = 0; i < 2; i++) {
      match.dealCardToDealer();
    }

    for (let i = 0; i < 2; i++) {
      match.dealCardToPlayer();
    }

    await this.matchRepository.saveAsync(match);
  }

  /**
   * ベットする
   *
   * @param command ベットコマンド
   */
  public async betAsync(command: MatchBetCommand): Promise<void> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    match.bet(new ChipAmount(command.amount));

    await this.matchRepository.saveAsync(match);
  }

  /**
   * ヒットする
   *
   * @param command ヒットコマンド
   */
  public async hitAsync(command: MatchHitCommand): Promise<void> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    if (!match.canHit()) {
      throw new MatchCannotHitError();
    }

    match.dealCardToPlayer();

    await this.matchRepository.saveAsync(match);
  }

  /**
   * スタンドする
   *
   * @param command スタンドコマンド
   */
  public async standAsync(command: MatchStandCommand): Promise<void> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    match.stand();

    await this.matchRepository.saveAsync(match);
  }

  /**
   * ラウンドを完了する
   *
   * @param command ラウンド完了コマンド
   */
  public async completeRoundAsync(
    command: MatchCompleteRoundCommand,
  ): Promise<void> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    match.resolveDealersHand();

    await this.matchRepository.saveAsync(match);
  }

  /**
   * ラウンドの結果を取得する
   *
   * @param command ラウンドの結果取得コマンド
   * @returns ラウンドの結果取得結果
   */
  public async getRoundResultAsync(
    command: MatchGetRoundResultCommand,
  ): Promise<MatchGetRoundResultResult> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    const roundResult = this.roundService.calculateResult(
      match.getPlayersHand(),
      match.getDealersHand(),
    );

    return new MatchGetRoundResultResult(roundResult);
  }
}
