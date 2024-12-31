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
import { PlayerId } from "@/domain/models/players/playerId";
import { Balance } from "@/domain/models/balances/balance";
import { Player } from "@/domain/models/players/player";
import { MatchGetPlayersNamesCommand } from "./getPlayersNames/matchGetPlayersNamesCommand";
import { MatchGetPlayersNamesResult } from "./getPlayersNames/matchGetPlayersNamesResult";
import { MatchGetPlayersNamesResultPlayer } from "./getPlayersNames/matchGetPlayersNamesResultPlayer";
import { UserRepository } from "@/domain/models/users/userRepository";

/**
 * 試合アプリケーションサービス
 */
export class MatchApplicationService {
  /**
   * コンストラクタ
   *
   * @param matchFactory 試合ファクトリ
   * @param matchRepository 試合リポジトリ
   * @param userRepository ユーザリポジトリ
   */
  public constructor(
    private readonly matchFactory: MatchFactory,
    private readonly matchRepository: MatchRepository,
    private readonly userRepository: UserRepository,
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
      command.userIds.map((userId) => new UserId(userId)),
    );

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

    match.bet(new PlayerId(command.playerId), new ChipAmount(command.amount));

    await this.matchRepository.saveAsync(match);
  }

  /**
   * ヒットする
   *
   * @param command ヒットコマンド
   */
  public async hitAsync(command: MatchHitCommand): Promise<void> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    match.hit(new PlayerId(command.playerId));

    await this.matchRepository.saveAsync(match);
  }

  /**
   * スタンドする
   *
   * @param command スタンドコマンド
   */
  public async standAsync(command: MatchStandCommand): Promise<void> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    match.stand(new PlayerId(command.playerId));

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

    // TODO Object.groupBy などで、もう少し簡単に書けるかもしれない
    const resultPlayers: MatchGetResultResultPlayer[] = [];
    for (const playerId of match.getPlayerIds()) {
      const creditHistories: ChipAmount[] = [];
      for (const roundHistory of roundHistories) {
        const playerRoundHistory = roundHistory.players.find(
          (x) => x.id.value === playerId.value,
        );
        creditHistories.push(playerRoundHistory!.credit);
      }

      const finalCredit = creditHistories.at(-1)!;
      const balance = Balance.create(Player.INITIAL_CREDIT, finalCredit);

      resultPlayers.push(
        new MatchGetResultResultPlayer(
          playerId.value,
          creditHistories.map((creditHistory) => creditHistory.value),
          finalCredit.value,
          balance.value,
        ),
      );
    }

    return new MatchGetResultResult(resultPlayers);
  }

  /**
   * プレイヤー名を取得する
   *
   * @param command プレイヤー名取得コマンド
   * @returns プレイヤー名取得結果
   */
  public async getPlayersNamesAsync(
    command: MatchGetPlayersNamesCommand,
  ): Promise<MatchGetPlayersNamesResult> {
    const match = await this.matchRepository.findAsync(new MatchId(command.id));

    const players: MatchGetPlayersNamesResultPlayer[] = [];
    for (const playerId of match.getPlayerIds()) {
      const userId = match.getUserId(playerId);
      const user = await this.userRepository.findAsync(userId);
      players.push(
        new MatchGetPlayersNamesResultPlayer(playerId.value, user.name.value),
      );
    }

    return new MatchGetPlayersNamesResult(players);
  }
}
