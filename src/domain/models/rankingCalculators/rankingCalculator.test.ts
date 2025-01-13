import { describe, expect, test } from "vitest";
import { RankingCalculator } from "./rankingCalculator";

describe("calculate", () => {
  test("Can calculate rankings for all different scores.", () => {
    // Arrange
    const scoreMap = new Map<string, number>([
      ["Alice", 10],
      ["Bob", 30],
      ["Chris", 20],
    ]);

    // Act
    const ranking = RankingCalculator.calculate(scoreMap);

    // Assert
    expect(ranking.get("Alice")).toBe(3);
    expect(ranking.get("Bob")).toBe(1);
    expect(ranking.get("Chris")).toBe(2);
  });
});

describe("calculate", () => {
  test("Can calculate rankings when there are duplicates in scores.", () => {
    // Arrange
    const scoreMap = new Map<string, number>([
      ["Alice", 10],
      ["Bob", 30],
      ["Chris", 30],
    ]);

    // Act
    const ranking = RankingCalculator.calculate(scoreMap);

    // Assert
    expect(ranking.get("Alice")).toBe(3);
    expect(ranking.get("Bob")).toBe(1);
    expect(ranking.get("Chris")).toBe(1);
  });
});
