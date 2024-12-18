import { RoundFactory } from "@/domain/models/rounds/roundFactory";
import { RoundRepository } from "@/domain/models/rounds/roundRepository";
import { RoundCreateCommand } from "./Create/roundCreateCommand";
import { RoundCreateResult } from "./Create/roundCreateResult";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { RoundStartCommand } from "./Start/roundStartCommand";
import { RoundId } from "@/domain/models/rounds/roundId";
import { ShoeRepository } from "@/domain/models/shoes/shoeRepository";
import { RoundGetPlayersHandCommand } from "./GetPlayersHand/roundGetPlayersHandCommand";
import { RoundGetPlayersHandResult } from "./GetPlayersHand/roundGetPlayersHandResult";
import { RoundGetPlayersHandResultCard } from "./GetPlayersHand/roundGetPlayersHandResultCard";
import { RoundGetHandSignalOptionsCommand } from "./GetHandSignalOptions/roundGetHandSignalOptionsCommand";
import { RoundGetHandSignalOptionsResult } from "./GetHandSignalOptions/roundGetHandSignalOptionsResult";
import { RoundHitCommand } from "./Hit/roundHitCommand";
import { RoundCannotHitError } from "./Hit/roundCannotHitError";
import { RoundStandCommand } from "./Stand/roundStandCommand";
import { RoundCompleteCommand } from "./Complete/roundCompleteCommand";
import { RoundGetUpCardCommand } from "./GetUpCard/roundGetUpCardCommand";
import { RoundGetUpCardResult } from "./GetUpCard/roundGetUpCardResult";
import { RoundGetDealersHandCommand } from "./GetDealersHand/roundGetDealersHandCommand";
import { RoundGetDealersHandResult } from "./GetDealersHand/roundGetDealersHandResult";
import { RoundGetDealersHandResultCard } from "./GetDealersHand/roundGetDealersHandResultCard";
import { RoundGetResultCommand } from "./GetResult/roundGetResultCommand";
import { RoundGetResultResult } from "./GetResult/roundGetResultResult";
import { RoundService } from "@/domain/services/roundService";

/**
 * ラウンドアプリケーションサービス
 */
export class RoundApplicationService {
  /**
   * コンストラクタ
   *
   * @param roundFactory ラウンドファクトリ
   * @param roundRepository ラウンドリポジトリ
   * @param shoeRepository シューリポジトリ
   * @param roundService ラウンドサービス
   */
  public constructor(
    private readonly roundFactory: RoundFactory,
    private readonly roundRepository: RoundRepository,
    private readonly shoeRepository: ShoeRepository,
    private readonly roundService: RoundService,
  ) {}

  /**
   * ラウンドを生成する
   *
   * @param command ラウンド生成コマンド
   * @returns ラウンド生成結果
   */
  public async createAsync(
    command: RoundCreateCommand,
  ): Promise<RoundCreateResult> {
    const round = this.roundFactory.create(new ShoeId(command.shoeId));

    await this.roundRepository.saveAsync(round);

    return new RoundCreateResult(round.id.value);
  }

  /**
   * ラウンドを開始する
   *
   * @param command ラウンド開始コマンド
   */
  public async startAsync(command: RoundStartCommand): Promise<void> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));
    const shoe = await this.shoeRepository.findAsync(round.shoeId);

    // TODO ラウンドがまだ開始していないことの検証

    for (let i = 0; i < 2; i++) {
      round.dealCardToDealer(shoe.peek());
      shoe.draw();
    }

    for (let i = 0; i < 2; i++) {
      round.dealCardToPlayer(shoe.peek());
      shoe.draw();
    }

    // TODO トランザクション処理
    await this.roundRepository.saveAsync(round);
    await this.shoeRepository.saveAsync(shoe);
  }

  /**
   * プレイヤーのハンドを取得する
   *
   * @param command プレイヤーのハンド取得コマンド
   * @returns プレイヤーのハンド取得結果
   */
  public async getPlayersHandAsync(
    command: RoundGetPlayersHandCommand,
  ): Promise<RoundGetPlayersHandResult> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));

    const playersHand = round.getPlayersHand();

    return new RoundGetPlayersHandResult(
      playersHand
        .getCards()
        .map((card) => new RoundGetPlayersHandResultCard(card)),
      playersHand.calculateTotal(),
      playersHand.isResolved(),
    );
  }

  /**
   * プレイヤーのハンドシグナルの選択肢を取得する
   *
   * @param command プレイヤーのハンドシグナルの選択肢取得コマンド
   * @returns プレイヤーのハンドシグナルの選択肢取得結果
   */
  public async getHandSignalOptionsAsync(
    command: RoundGetHandSignalOptionsCommand,
  ): Promise<RoundGetHandSignalOptionsResult> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));

    return new RoundGetHandSignalOptionsResult(
      round.getPlayersHandSignalOptions(),
    );
  }

  /**
   * ヒットする
   *
   * @param command ヒットコマンド
   */
  public async hitAsync(command: RoundHitCommand): Promise<void> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));
    const shoe = await this.shoeRepository.findAsync(round.shoeId);

    const playersHand = round.getPlayersHand();
    if (!playersHand.canHit()) {
      throw new RoundCannotHitError();
    }

    round.dealCardToPlayer(shoe.peek());
    shoe.draw();

    // TODO トランザクション処理
    await this.roundRepository.saveAsync(round);
    await this.shoeRepository.saveAsync(shoe);
  }

  /**
   * スタンドする
   *
   * @param command スタンドコマンド
   */
  public async standAsync(command: RoundStandCommand): Promise<void> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));

    round.standPlayersHand();

    await this.roundRepository.saveAsync(round);
  }

  /**
   * アップカードを取得する
   *
   * @param command アップカード取得コマンド
   * @returns アップカード取得結果
   */
  public async getUpCardAsync(
    command: RoundGetUpCardCommand,
  ): Promise<RoundGetUpCardResult> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));

    return new RoundGetUpCardResult(round.getUpCard());
  }

  /**
   * ラウンドを完了する
   *
   * @param command ラウンド完了コマンド
   */
  public async completeAsync(command: RoundCompleteCommand): Promise<void> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));
    const shoe = await this.shoeRepository.findAsync(round.shoeId);

    while (round.shouldDealerHit()) {
      round.dealCardToDealer(shoe.peek());
      shoe.draw();
    }

    if (!round.getDealersHand().isResolved()) {
      round.standDealearsHand();
    }
  }

  /**
   * ディーラーのハンドを取得する
   *
   * @param command ディーラーのハンド取得コマンド
   * @returns ディーラーのハンド取得結果
   */
  public async getDealersHandAsync(
    command: RoundGetDealersHandCommand,
  ): Promise<RoundGetDealersHandResult> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));

    const dealersHand = round.getDealersHand();

    return new RoundGetDealersHandResult(
      dealersHand
        .getCards()
        .map((card) => new RoundGetDealersHandResultCard(card)),
      dealersHand.calculateTotal(),
      dealersHand.isResolved(),
    );
  }

  /**
   * ラウンドの結果を取得する
   *
   * @param command ラウンドの結果取得コマンド
   * @returns ラウンドの結果取得結果
   */
  public async getResultAsync(
    command: RoundGetResultCommand,
  ): Promise<RoundGetResultResult> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));

    const roundResult = this.roundService.calculateResult(
      round.getPlayersHand(),
      round.getDealersHand(),
    );

    return new RoundGetResultResult(roundResult);
  }
}
