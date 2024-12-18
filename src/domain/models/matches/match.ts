import { ChipAmount } from "../chipAmounts/chipAmount";
import { Credit } from "../credits/credit";
import { RoundId } from "../rounds/roundId";
import { ShoeId } from "../shoes/shoeId";
import { MatchId } from "./matchId";

/**
 * 試合
 */
export class Match {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param shoeId シュー ID
   * @param rounds ラウンド ID リスト
   * @param credit クレジット
   */
  private constructor(
    public readonly id: MatchId,
    public readonly shoeId: ShoeId,
    private roundIds: RoundId[],
    private credit: Credit,
  ) {}

  /**
   * インスタンスを生成する
   *
   * @param id ID
   * @param shoeId シュー ID
   * @returns インスタンス
   */
  public static create(id: MatchId, shoeId: ShoeId) {
    // TODO クレジットの初期値
    return new Match(id, shoeId, [], new Credit(new ChipAmount(50000)));
  }

  /**
   * ラウンドを追加する
   *
   * @param roundId
   */
  public addRound(roundId: RoundId): void {
    this.roundIds = [...this.roundIds, roundId];
  }

  /**
   * ラウンド ID リストを取得する
   *
   * @returns ラウンド ID リスト
   */
  public getRoundIds(): RoundId[] {
    return [...this.roundIds];
  }

  /**
   * クレジットを取得する
   *
   * @returns クレジット
   */
  public getCredit(): Credit {
    return this.credit;
  }
}
