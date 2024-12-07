import { describe, expect, test } from "vitest";
import { Hand } from "./hand";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";

describe("get soft total", () => {
  test("The soft total of an empty hand is 0.", () => {
    // Arrange
    const hand = new Hand([], false);

    // Act
    const softTotal = hand.calculateSoftTotal();

    // Assert
    expect(softTotal).toBe(0);
  });

  test.each([
    {
      cards: [new Card(Rank.Two, Suit.Spade)],
      expected: 2,
    },
    {
      cards: [new Card(Rank.Two, Suit.Spade), new Card(Rank.Three, Suit.Spade)],
      expected: 5,
    },
    {
      cards: [
        new Card(Rank.Two, Suit.Spade),
        new Card(Rank.Three, Suit.Spade),
        new Card(Rank.Jack, Suit.Spade),
      ],
      expected: 15,
    },
  ] as {
    cards: Card[];
    expected: number;
  }[])(
    "The soft total of a hand without any ace cards.",
    ({ cards, expected }) => {
      // Arrange
      const hand = new Hand(cards, false);

      // Act
      const softTotal = hand.calculateSoftTotal();

      // Assert
      expect(softTotal).toBe(expected);
    },
  );

  test.each([
    {
      cards: [new Card(Rank.Ace, Suit.Spade)],
      expected: 11,
    },
    {
      cards: [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ace, Suit.Spade)],
      expected: 22,
    },
    {
      cards: [
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Two, Suit.Spade),
        new Card(Rank.Three, Suit.Spade),
      ],
      expected: 16,
    },
  ] as {
    cards: Card[];
    expected: number;
  }[])(
    "The soft total of a hand with some ace cards.",
    ({ cards, expected }) => {
      // Arrange
      const hand = new Hand(cards, false);

      // Act
      const softTotal = hand.calculateSoftTotal();

      // Assert
      expect(softTotal).toBe(expected);
    },
  );
});

describe("get hard total", () => {
  test("The hard total of an empty hand is 0.", () => {
    // Arrange
    const hand = new Hand([], false);

    // Act
    const hardTotal = hand.calculateHardTotal();

    // Assert
    expect(hardTotal).toBe(0);
  });

  test.each([
    {
      cards: [new Card(Rank.Two, Suit.Spade)],
      expected: 2,
    },
    {
      cards: [new Card(Rank.Two, Suit.Spade), new Card(Rank.Three, Suit.Spade)],
      expected: 5,
    },
    {
      cards: [
        new Card(Rank.Two, Suit.Spade),
        new Card(Rank.Three, Suit.Spade),
        new Card(Rank.Jack, Suit.Spade),
      ],
      expected: 15,
    },
  ] as {
    cards: Card[];
    expected: number;
  }[])(
    "The hard total of a hand without any ace cards.",
    ({ cards, expected }) => {
      // Arrange
      const hand = new Hand(cards, false);

      // Act
      const hardTotal = hand.calculateHardTotal();

      // Assert
      expect(hardTotal).toBe(expected);
    },
  );

  test.each([
    {
      cards: [new Card(Rank.Ace, Suit.Spade)],
      expected: 1,
    },
    {
      cards: [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ace, Suit.Spade)],
      expected: 2,
    },
    {
      cards: [
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Two, Suit.Spade),
        new Card(Rank.Three, Suit.Spade),
      ],
      expected: 6,
    },
  ] as {
    cards: Card[];
    expected: number;
  }[])(
    "The hard total of a hand with some ace cards.",
    ({ cards, expected }) => {
      // Arrange
      const hand = new Hand(cards, false);

      // Act
      const hardTotal = hand.calculateHardTotal();

      // Assert
      expect(hardTotal).toBe(expected);
    },
  );
});

describe("count", () => {
  test("The count of empty hand is 0.", () => {
    // Arrange
    const hand = new Hand([], false);

    // Act
    const count = hand.count();

    // Assert
    expect(count).toBe(0);
  });

  test("The count of a hand with one card is 1.", () => {
    // Arrange
    const hand = new Hand([new Card(Rank.Ace, Suit.Spade)], false);

    // Act
    const count = hand.count();

    // Assert
    expect(count).toBe(1);
  });

  test("The count of a hand with two cards is 2.", () => {
    // Arrange
    const hand = new Hand(
      [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ace, Suit.Spade)],
      false,
    );

    // Act
    const count = hand.count();

    // Assert
    expect(count).toBe(2);
  });
});

describe("is black jack", () => {
  test("The hand is black jack if the count is 2 and the soft total is 21.", () => {
    // Arrange
    const hand = new Hand(
      [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Jack, Suit.Spade)],
      false,
    );

    // Act, Assert
    expect(hand.isBlackJack()).toBe(true);
  });

  test("The hand is not black jack if the count is 2 and the soft total is not 21.", () => {
    // Arrange
    const hand = new Hand(
      [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Two, Suit.Spade)],
      false,
    );

    // Act, Assert
    expect(hand.isBlackJack()).toBe(false);
  });

  test("The hand is not black jack if the count is not 2 and the soft total is 21.", () => {
    // Arrange
    const hand = new Hand(
      [
        new Card(Rank.Two, Suit.Spade),
        new Card(Rank.Nine, Suit.Spade),
        new Card(Rank.Ten, Suit.Spade),
      ],
      false,
    );

    // Act, Assert
    expect(hand.isBlackJack()).toBe(false);
  });
});

describe("is bust", () => {
  test("The hand is bust if the hard total is greater than 21.", () => {
    // Arrange
    const hand = new Hand(
      [
        new Card(Rank.Jack, Suit.Spade),
        new Card(Rank.Jack, Suit.Spade),
        new Card(Rank.Jack, Suit.Spade),
      ],
      false,
    );

    // Act, Assert
    expect(hand.isBust()).toBe(true);
  });

  test("The hand is not bust if the soft total is less than equal 21.", () => {
    // Arrange
    const hand = new Hand(
      [new Card(Rank.Jack, Suit.Spade), new Card(Rank.Ace, Suit.Spade)],
      false,
    );

    // Act, Assert
    expect(hand.isBust()).toBe(false);
  });

  test("The hand is not bust if the soft total is greater than 21 but the hard total is less than equal 21.", () => {
    // Arrange
    const hand = new Hand(
      [
        new Card(Rank.Jack, Suit.Spade),
        new Card(Rank.Jack, Suit.Spade),
        new Card(Rank.Ace, Suit.Spade),
      ],
      false,
    );

    // Act, Assert
    expect(hand.isBust()).toBe(false);
  });
});

describe("can hit", () => {
  test("Can hit if the soft total is less than 21.", () => {
    // Arrange
    const hand = new Hand(
      [new Card(Rank.Jack, Suit.Spade), new Card(Rank.Jack, Suit.Spade)],
      false,
    );

    // Act, Assert
    expect(hand.canHit()).toBe(true);
  });

  test("Can hit if the soft total is greater than 21 but the hard total is less than 21.", () => {
    // Arrange
    const hand = new Hand(
      [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ace, Suit.Spade)],
      false,
    );

    // Act, Assert
    expect(hand.canHit()).toBe(true);
  });

  test("Cannot hit if the hand is black jack.", () => {
    // Arrange
    const hand = new Hand(
      [new Card(Rank.Jack, Suit.Spade), new Card(Rank.Ace, Suit.Spade)],
      false,
    );

    // Act, Assert
    expect(hand.canHit()).toBe(false);
  });

  test("Cannot hit if the hand is not black jack but the soft total is 21.", () => {
    // Arrange
    const hand = new Hand(
      [
        new Card(Rank.Two, Suit.Spade),
        new Card(Rank.Eight, Suit.Spade),
        new Card(Rank.Ace, Suit.Spade),
      ],
      false,
    );

    // Act, Assert
    expect(hand.canHit()).toBe(false);
  });

  test("Cannot hit if the hard total is greater than equal 21.", () => {
    // Arrange
    const hand = new Hand(
      [
        new Card(Rank.Jack, Suit.Spade),
        new Card(Rank.Jack, Suit.Spade),
        new Card(Rank.Ace, Suit.Spade),
      ],
      false,
    );

    // Act, Assert
    expect(hand.canHit()).toBe(false);
  });
});
