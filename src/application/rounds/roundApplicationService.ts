import { RoundFactory } from "@/domain/models/rounds/roundFactory";
import { RoundRepository } from "@/domain/models/rounds/roundRepository";
import { RoundCreateCommand } from "./Create/roundCreateCommand";
import { RoundCreateResult } from "./Create/roundCreateResult";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { RoundStartCommand } from "./Start/roundStartCommand";
import { RoundId } from "@/domain/models/rounds/roundId";
import { ShoeRepository } from "@/domain/models/shoes/shoeRepository";
import { RoundGetPlayerHandCommand } from "./GetPlayerHand/roundGetPlayerHandCommand";
import { RoundGetPlayerHandResult } from "./GetPlayerHand/roundGetPlayerHandResult";
import { RoundGetPlayerHandResultCard } from "./GetPlayerHand/roundGetPlayerHandResultCard";
import { RoundGetHandSignalOptionsCommand } from "./GetHandSignalOptions/roundGetHandSignalOptionsCommand";
import { RoundGetHandSignalOptionsResult } from "./GetHandSignalOptions/roundGetHandSignalOptionsResult";
import { RoundGetPlayerHandResultHand } from "./GetPlayerHand/roundGetPlayerHandResultHand";
import { RoundHitCommand } from "./Hit/roundHitCommand";
import { RoundCannotHitError } from "./Hit/roundCannotHitError";
import { RoundStandCommand } from "./Stand/roundStandCommand";
import { RoundCompleteCommand } from "./Complete/roundCompleteCommand";
import { RoundGetUpCardCommand } from "./GetUpCard/roundGetUpCardCommand";
import { RoundGetUpCardResult } from "./GetUpCard/roundGetUpCardResult";

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
   */
  public constructor(
    private readonly roundFactory: RoundFactory,
    private readonly roundRepository: RoundRepository,
    private readonly shoeRepository: ShoeRepository,
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
  public async getPlayerHandAsync(
    command: RoundGetPlayerHandCommand,
  ): Promise<RoundGetPlayerHandResult> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));

    const playerHand = round.getPlayerHand();

    return new RoundGetPlayerHandResult(
      new RoundGetPlayerHandResultHand(
        playerHand
          .getCards()
          .map((card) => new RoundGetPlayerHandResultCard(card)),
        playerHand.calculateSoftTotal(),
        playerHand.calculateHardTotal(),
        playerHand.isResolved(),
      ),
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
      round.getPlayerHandSignalOptions(),
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

    const playerHand = round.getPlayerHand();
    if (!playerHand.canHit()) {
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

    round.standPlayerHand();

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

    if (!round.getDealerHand().isResolved()) {
      round.standDealearsHand();
    }
  }
}
