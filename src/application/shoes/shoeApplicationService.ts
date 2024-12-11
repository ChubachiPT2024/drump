import { ShoeRepository } from "@/domain/models/shoes/shoeRepository";
import { ShoeFactory } from "@/domain/models/shoes/shoeFactory";
import { Deck } from "@/domain/models/decks/deck";
import { ShoeCreateResult } from "./Create/shoeCreateResult";
import { CardsService } from "@/domain/services/cardsService";

/**
 * シューアプリケーションサービス
 */
export class ShoeApplicationService {
  /**
   * コンストラクタ
   *
   * @param shoeFactory シューファクトリ
   * @param shoeRepository シューリポジトリ
   * @param cardsService カードサービス
   */
  public constructor(
    private readonly shoeFactory: ShoeFactory,
    private readonly shoeRepository: ShoeRepository,
    private readonly cardsService: CardsService,
  ) {}

  /**
   * シューを生成する
   *
   * @returns シュー生成結果
   */
  public async createAsync(): Promise<ShoeCreateResult> {
    const numberOfDecks = 6;
    const cards = [];
    for (let i = 0; i < numberOfDecks; i++) {
      cards.push(...Deck.create().getCards());
    }

    this.cardsService.suffle(cards);

    const shoe = this.shoeFactory.create(cards);

    await this.shoeRepository.saveAsync(shoe);

    return new ShoeCreateResult(shoe.id.value);
  }
}
