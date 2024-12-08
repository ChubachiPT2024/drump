import { RoundFactory } from "@/domain/models/rounds/roundFactory";
import { RoundRepository } from "@/domain/models/rounds/roundRepository";
import { RoundCreateCommand } from "./roundCreateCommand";
import { RoundCreateResult } from "./roundCreateResult";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { RoundStartCommand } from "./roundStartCommand";
import { RoundId } from "@/domain/models/rounds/roundId";
import { ShoeRepository } from "@/domain/models/shoes/shoeRepository";
import { RoundGetPlayerHandCommand } from "./roundGetPlayerHandCommand";
import { RoundGetPlayerHandResult } from "./roundGetPlayerHandResult";
import { RoundGetPlayerHandResultCard } from "./roundGetPlayerHandResultCard";
import { RoundGetHandSignalOptionsCommand } from "./roundGetHandSignalOptionsCommand";
import { RoundGetHandSignalOptionsResult } from "./roundGetHandSignalOptionsResult";

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

    return new RoundGetPlayerHandResult(
      round
        .getPlayerHand()
        .getCards()
        .map((card) => new RoundGetPlayerHandResultCard(card)),
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
}
