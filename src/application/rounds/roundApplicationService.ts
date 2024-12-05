import { RoundFactory } from "@/domain/models/rounds/roundFactory";
import { RoundRepository } from "@/domain/models/rounds/roundRepository";
import { RoundCreateCommand } from "./roundCreateCommand";
import { RoundCreateResult } from "./roundCreateResult";
import { ShoeId } from "@/domain/models/shoes/shoeId";

/**
 * ラウンドアプリケーションサービス
 */
export class RoundApplicationService {
  /**
   * コンストラクタ
   *
   * @param roundFactory ラウンドファクトリ
   * @param roundRepository ラウンドリポジトリ
   */
  public constructor(
    private readonly roundFactory: RoundFactory,
    private readonly roundRepository: RoundRepository,
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
}
