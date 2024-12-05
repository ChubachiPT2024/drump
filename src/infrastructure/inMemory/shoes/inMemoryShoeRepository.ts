import { Shoe } from "@/domain/models/shoes/shoe";
import { ShoeRepository } from "@/domain/models/shoes/shoeRepository";

/**
 * インメモリシューリポジトリ
 */
export class InMemoryShoeRepository implements ShoeRepository {
  /**
   * シュー
   */
  private readonly shoes = new Map<number, Shoe>();

  /**
   * シューを保存する
   *
   * @param shoe シュー
   */
  public async saveAsync(shoe: Shoe): Promise<void> {
    this.shoes.set(shoe.id, shoe);
  }

  /**
   * シューを検索する
   *
   * @param id ID
   * @returns シュー
   */
  public async findAsync(id: number): Promise<Shoe> {
    const shoe = this.shoes.get(id);
    if (!shoe) {
      throw new Error("The shoe is not found.");
    }
    return shoe;
  }
}
