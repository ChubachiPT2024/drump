import { RoundFactory } from "@/domain/models/rounds/roundFactory";
import { RoundRepository } from "@/domain/models/rounds/roundRepository";
import { RoundCreateCommand } from "./roundCreateCommand";
import { RoundCreateResult } from "./roundCreateResult";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { RoundStartCommand } from "./roundStartCommand";
import { RoundId } from "@/domain/models/rounds/roundId";
import { ShoeRepository } from "@/domain/models/shoes/shoeRepository";

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
}
