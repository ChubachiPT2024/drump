import { Shoe } from "@/domain/models/shoes/shoe";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { ShoeRepository } from "@/domain/models/shoes/shoeRepository";

/**
 * インメモリシューリポジトリ
 */
export class InMemoryShoeRepository implements ShoeRepository {
  /**
   * シュー
   *
   * キーは厳密等価で判定されるので、プリミティブ型を使用する
   */
  private readonly shoes = new Map<string, Shoe>();

  /**
   * シューを保存する
   *
   * @param shoe シュー
   */
  public async saveAsync(shoe: Shoe): Promise<void> {
    this.shoes.set(shoe.id.value, shoe);
  }

  /**
   * シューを検索する
   *
   * @param id ID
   * @returns シュー
   */
  public async findAsync(id: ShoeId): Promise<Shoe> {
    const shoe = this.shoes.get(id.value);
    if (!shoe) {
      throw new Error("The shoe is not found.");
    }
    return shoe;
  }
}
