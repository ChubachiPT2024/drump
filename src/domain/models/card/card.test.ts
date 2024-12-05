import { describe, expect, test } from "vitest";
import { Rank } from "../ranks/rank";
import { Card } from "../card/card";
import { Suit } from "../suits/suit";

describe("get soft point", () => {
  test.each([
    { rank: Rank.Ace, expected: 11 },
    { rank: Rank.Two, expected: 2 },
    { rank: Rank.Three, expected: 3 },
    { rank: Rank.Four, expected: 4 },
    { rank: Rank.Five, expected: 5 },
    { rank: Rank.Six, expected: 6 },
    { rank: Rank.Seven, expected: 7 },
    { rank: Rank.Eight, expected: 8 },
    { rank: Rank.Nine, expected: 9 },
    { rank: Rank.Ten, expected: 10 },
    { rank: Rank.Jack, expected: 10 },
    { rank: Rank.Queen, expected: 10 },
    { rank: Rank.King, expected: 10 },
  ] as {
    rank: Rank;
    expected: number;
  }[])(
    "The soft point is $expected if the rank is $rank",
    ({ rank, expected }) => {
      // Arrange
      const card = new Card(rank, Suit.Diamond);

      // Act
      const softPoint = card.getSoftPoint();

      // Assert
      expect(softPoint).toBe(expected);
    },
  );
});

describe("get hard point", () => {
  test.each([
    { rank: Rank.Ace, expected: 1 },
    { rank: Rank.Two, expected: 2 },
    { rank: Rank.Three, expected: 3 },
    { rank: Rank.Four, expected: 4 },
    { rank: Rank.Five, expected: 5 },
    { rank: Rank.Six, expected: 6 },
    { rank: Rank.Seven, expected: 7 },
    { rank: Rank.Eight, expected: 8 },
    { rank: Rank.Nine, expected: 9 },
    { rank: Rank.Ten, expected: 10 },
    { rank: Rank.Jack, expected: 10 },
    { rank: Rank.Queen, expected: 10 },
    { rank: Rank.King, expected: 10 },
  ] as {
    rank: Rank;
    expected: number;
  }[])(
    "The hard point is $expected if the rank is $rank",
    ({ rank, expected }) => {
      // Arrange
      const card = new Card(rank, Suit.Diamond);

      // Act
      const hardPoint = card.getHardPoint();

      // Assert
      expect(hardPoint).toBe(expected);
    },
  );
});

describe("equals", () => {
  test("Two cards are equal if their rank are equal and their suit are equal.", () => {
    // Arrange
    const card1 = new Card(Rank.Ace, Suit.Spade);
    const card2 = new Card(Rank.Ace, Suit.Spade);

    // Act, Assert
    expect(card1.equals(card2)).toBe(true);
  });

  test("Two cards are not equal if their rank are not equal.", () => {
    // Arrange
    const card1 = new Card(Rank.Ace, Suit.Spade);
    const card2 = new Card(Rank.Two, Suit.Spade);

    // Act, Assert
    expect(card1.equals(card2)).toBe(false);
  });

  test("Two cards are not equal if their suit are not equal.", () => {
    // Arrange
    const card1 = new Card(Rank.Ace, Suit.Spade);
    const card2 = new Card(Rank.Ace, Suit.Diamond);

    // Act, Assert
    expect(card1.equals(card2)).toBe(false);
  });
});
