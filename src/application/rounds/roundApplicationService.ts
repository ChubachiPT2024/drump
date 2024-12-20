import { RoundFactory } from "@/domain/models/rounds/roundFactory";
import { RoundRepository } from "@/domain/models/rounds/roundRepository";
import { RoundCreateCommand } from "./Create/roundCreateCommand";
import { RoundCreateResult } from "./Create/roundCreateResult";
import { RoundStartCommand } from "./Start/roundStartCommand";
import { RoundId } from "@/domain/models/rounds/roundId";
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
import { DealerRepository } from "@/domain/models/dealers/dealerRepository";
import { DealerFactory } from "@/domain/models/dealers/dealerFactory";
import { PlayerRepository } from "@/domain/models/players/playerRepository";
import { PlayerId } from "@/domain/models/players/playerId";

/**
 * ラウンドアプリケーションサービス
 */
export class RoundApplicationService {
  /**
   * コンストラクタ
   *
   * @param roundFactory ラウンドファクトリ
   * @param dealerFactory ディーラーファクトリ
   * @param roundRepository ラウンドリポジトリ
   * @param dealerRepository ディーラーリポジトリ
   * @param playerRepository プレイヤーリポジトリ
   * @param roundService ラウンドサービス
   */
  public constructor(
    private readonly roundFactory: RoundFactory,
    private readonly dealerFactory: DealerFactory,
    private readonly roundRepository: RoundRepository,
    private readonly dealerRepository: DealerRepository,
    private readonly playerRepository: PlayerRepository,
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
    // TODO dealerApplicationService.createAsync() を作って分割を検討
    const dealer = this.dealerFactory.create();
    await this.dealerRepository.saveAsync(dealer);

    const round = this.roundFactory.create(
      dealer.id,
      new PlayerId(command.playerId),
    );
    await this.roundRepository.saveAsync(round);

    return new RoundCreateResult(round.id.value);
  }

  /**
   * ラウンドを開始する
   *
   * @param command ラウンド開始コマンド
   */
  // public async startAsync(command: RoundStartCommand): Promise<void> {
  //   const round = await this.roundRepository.findAsync(new RoundId(command.id));
  //   const dealer = await this.dealerRepository.findAsync(round.dealerId);
  //   const player = await this.playerRepository.findAsync(round.playerId);

  //   // TODO ラウンドがまだ開始していないことの検証

  //   for (let i = 0; i < 2; i++) {
  //     dealer.addCardToHand(shoe.peek());
  //     shoe.draw();
  //   }

  //   for (let i = 0; i < 2; i++) {
  //     player.addCardToHand(shoe.peek());
  //     shoe.draw();
  //   }

  //   // TODO トランザクション処理
  //   await this.dealerRepository.saveAsync(dealer);
  //   await this.playerRepository.saveAsync(player);
  // }

  /**
   * ヒットする
   *
   * @param command ヒットコマンド
   */
  // public async hitAsync(command: RoundHitCommand): Promise<void> {
  //   const round = await this.roundRepository.findAsync(new RoundId(command.id));
  //   const player = await this.playerRepository.findAsync(round.playerId);

  //   if (!player.getHand().canHit()) {
  //     throw new RoundCannotHitError();
  //   }

  //   player.addCardToHand(shoe.peek());
  //   shoe.draw();

  //   // TODO トランザクション処理
  //   await this.playerRepository.saveAsync(player);
  // }

  /**
   * スタンドする
   *
   * @param command スタンドコマンド
   */
  public async standAsync(command: RoundStandCommand): Promise<void> {
    const round = await this.roundRepository.findAsync(new RoundId(command.id));
    const player = await this.playerRepository.findAsync(round.playerId);

    player.stand();

    await this.playerRepository.saveAsync(player);
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
    const dealer = await this.dealerRepository.findAsync(round.dealerId);

    return new RoundGetUpCardResult(dealer.getUpCard());
  }

  /**
   * ラウンドを完了する
   *
   * @param command ラウンド完了コマンド
   */
  // public async completeAsync(command: RoundCompleteCommand): Promise<void> {
  //   const round = await this.roundRepository.findAsync(new RoundId(command.id));
  //   const dealer = await this.dealerRepository.findAsync(round.dealerId);

  //   while (dealer.shouldHit()) {
  //     dealer.addCardToHand(shoe.peek());
  //     shoe.draw();
  //   }

  //   if (!dealer.getHand().isResolved()) {
  //     dealer.stand();
  //   }

  //   // TODO トランザクション処理
  //   await this.dealerRepository.saveAsync(dealer);
  // }

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
    const dealer = await this.dealerRepository.findAsync(round.dealerId);

    const dealersHand = dealer.getHand();

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
    const dealer = await this.dealerRepository.findAsync(round.dealerId);
    const player = await this.playerRepository.findAsync(round.playerId);

    const roundResult = this.roundService.calculateResult(
      player.getHand(),
      dealer.getHand(),
    );

    return new RoundGetResultResult(roundResult);
  }
}
