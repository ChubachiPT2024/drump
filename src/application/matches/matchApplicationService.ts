import { MatchFactory } from "@/domain/models/matches/matchFactory";
import { MatchRepository } from "@/domain/models/matches/matchRepository";
import { MatchCreateCommand } from "./create/matchCreateCommand";
import { MatchCreateResult } from "./create/matchCreateResult";
import { MatchId } from "@/domain/models/matches/matchId";
import { UserId } from "@/domain/models/users/userId";
import { MatchGetSummaryCommand } from "./getSummary/matchGetSummaryCommand";
import { MatchGetSummaryResult } from "./getSummary/matchGetSummaryResult";
import { MatchStartRoundCommand } from "./startRound/matchStartCommand";
import { MatchHitCommand } from "./hit/matchHitCommand";
import { MatchStandCommand } from "./stand/matchStandCommand";
import { MatchCannotHitError } from "./hit/matchCannotHitError";
import { MatchCompleteRoundCommand } from "./completeRound/matchCompleteRoundCommand";
import { MatchGetRoundResultCommand } from "./getRoundResult/matchGetRoundResultCommand";
import { MatchGetRoundResultResult } from "./getRoundResult/matchGetRoundResultResult";
import { MatchBetCommand } from "./bet/matchBetCommand";
import { ChipAmount } from "@/domain/models/chipAmounts/chipAmount";
import { MatchGetResultCommand } from "./getResult/matchGetResultCommand";
import { MatchGetResultResult } from "./getResult/matchGetResultResult";
import { MatchGetResultResultPlayer } from "./getResult/matchGetResultResultPlayer";
import { MatchApplicationRoundNotCompletedError } from "./matchApplicationRoundNotCompletedError";
import { MatchApplicationMatchNotCompletedError } from "./matchApplicationMatchNotCompletedError";

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

    match.startRound();

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

    match.completeRound();

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

    const roundHistory = match
      .getRoundHistories()
      .find((x) => x.roundCount.value === match.getRoundCount().value);
    if (!roundHistory) {
      throw new MatchApplicationRoundNotCompletedError();
    }

    return MatchGetRoundResultResult.create(roundHistory);
  }

  /**
   * 試合結果を取得する
   *
   * @param command 試合結果取得コマンド
   * @returns 試合結果取得結果
   */
  public async getResultAsync(
    command: MatchGetResultCommand,
  ): Promise<MatchGetResultResult> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    if (!match.isCompleted()) {
      throw new MatchApplicationMatchNotCompletedError();
    }

    const roundHistories = match.getRoundHistories();
    const finalCredit = roundHistories.at(-1)!.player.credit.value;

    // TODO Player に定義されるクレジットの初期値を使用する
    const balance = finalCredit - 50000;

    return new MatchGetResultResult(
      new MatchGetResultResultPlayer(
        roundHistories.map((x) => x.player.credit.value),
        finalCredit,
        balance,
      ),
    );
  }
}
