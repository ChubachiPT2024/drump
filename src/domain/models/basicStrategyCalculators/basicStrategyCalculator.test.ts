import { describe, expect, test } from "vitest";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";
import { HandSignal } from "../handSignals/handSignal";
import { Hand } from "../hands/hand";
import { BasicStrategyCalculator } from "./basicStrategyCalculator";

describe("calculate", () => {
  test.each([
    {
      cards: [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
      upCard: new Card(Rank.Two, Suit.Spade),
      expected: HandSignal.Stand,
    },

    {
      cards: [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Seven, Suit.Spade)],
      upCard: new Card(Rank.Two, Suit.Spade),
      expected: HandSignal.Stand,
    },

    {
      cards: [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Two, Suit.Spade)],
      upCard: new Card(Rank.Five, Suit.Spade),
      expected: HandSignal.Double,
    },
    {
      cards: [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Two, Suit.Spade)],
      upCard: new Card(Rank.Two, Suit.Spade),
      expected: HandSignal.Hit,
    },
  ] as {
    cards: Card[];
    upCard: Card;
    expected: HandSignal;
  }[])(
    "It returns the soft hand strategy if the hand is soft hand.",
    ({ cards, upCard, expected }) => {
      // Arrange
      let hand = Hand.create();
      for (const card of cards) {
        hand = hand.add(card);
      }

      // Act
      const basicStrategy = BasicStrategyCalculator.calculate(hand, upCard);

      // Assert
      expect(basicStrategy).toBe(expected);
    },
  );

  test.each([
    {
      cards: [new Card(Rank.Two, Suit.Spade), new Card(Rank.Two, Suit.Spade)],
      upCard: new Card(Rank.Two, Suit.Spade),
      expected: HandSignal.Hit,
    },
    {
      cards: [new Card(Rank.Two, Suit.Spade), new Card(Rank.Six, Suit.Spade)],
      upCard: new Card(Rank.Two, Suit.Spade),
      expected: HandSignal.Hit,
    },
    {
      cards: [new Card(Rank.Two, Suit.Spade), new Card(Rank.Seven, Suit.Spade)],
      upCard: new Card(Rank.Three, Suit.Spade),
      expected: HandSignal.Double,
    },
    {
      cards: [
        new Card(Rank.Nine, Suit.Spade),
        new Card(Rank.Eight, Suit.Spade),
      ],
      upCard: new Card(Rank.Two, Suit.Spade),
      expected: HandSignal.Stand,
    },
    {
      cards: [new Card(Rank.Nine, Suit.Spade), new Card(Rank.Nine, Suit.Spade)],
      upCard: new Card(Rank.Two, Suit.Spade),
      expected: HandSignal.Stand,
    },
  ] as {
    cards: Card[];
    upCard: Card;
    expected: HandSignal;
  }[])(
    "It returns the hard hand strategy if the hand is hard hand.",
    ({ cards, upCard, expected }) => {
      // Arrange
      let hand = Hand.create();
      for (const card of cards) {
        hand = hand.add(card);
      }

      // Act
      const basicStrategy = BasicStrategyCalculator.calculate(hand, upCard);

      // Assert
      expect(basicStrategy).toBe(expected);
    },
  );
});
