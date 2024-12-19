import { Dealer } from "@/domain/models/dealers/dealer";
import { DealerId } from "@/domain/models/dealers/dealerId";
import { DealerRepository } from "@/domain/models/dealers/dealerRepository";

/**
 * インメモリディーラーリポジトリ
 */
export class InMemoryDealerRepository implements DealerRepository {
  /**
   * ディーラー
   *
   * キーは厳密等価で判定されるので、プリミティブ型を使用する
   */
  private readonly dealers = new Map<string, Dealer>();

  /**
   * ディーラーを保存する
   *
   * @param dealer ディーラー
   */
  public async saveAsync(dealer: Dealer): Promise<void> {
    this.dealers.set(dealer.id.value, dealer);
  }

  /**
   * ディーラーを検索する
   *
   * @param id ID
   * @returns ディーラー
   */
  public async findAsync(id: DealerId): Promise<Dealer> {
    const dealer = this.dealers.get(id.value);
    if (!dealer) {
      throw new Error("The dealer is not found.");
    }
    return dealer;
  }
}
