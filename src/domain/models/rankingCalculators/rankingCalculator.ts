/**
 * ランキング計算機
 */
export class RankingCalculator {
  /**
   * ランキングを計算する
   *
   * @param scoreMap ランキング対象の識別子を key, ランキング基準のスコアを value とするマップ
   * @returns ランキング
   */
  public static calculate<TKey>(
    scoreMap: Map<TKey, number>,
  ): Map<TKey, number> {
    const scores = [...scoreMap.values()];

    // toSorted() と toReversed() を使いたいが、コンパイラオプションの変更が必要
    scores.sort();
    scores.reverse();

    const ranking = new Map<TKey, number>();
    for (const [key, score] of scoreMap.entries()) {
      ranking.set(key, scores.indexOf(score) + 1);
    }

    return ranking;
  }
}
