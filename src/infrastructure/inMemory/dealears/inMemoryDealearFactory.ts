import { Dealer } from "@/domain/models/dealers/dealer";
import { DealerFactory } from "@/domain/models/dealers/dealerFactory";
import { DealerId } from "@/domain/models/dealers/dealerId";

/**
 * インメモリディーラーファクトリ
 */
export class InMemoryDealerFactory implements DealerFactory {
  /**
   * ディーラーを生成する
   *
   * @returns ディーラー
   */
  public create(): Dealer {
    return Dealer.create(new DealerId(crypto.randomUUID()));
  }
}
