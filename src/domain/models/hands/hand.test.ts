import { describe, expect, test } from "vitest";
import { Hand } from "./hand";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";

describe("get total", () => {
  test("The total of an empty hand is 0.", () => {
    // Arrange
    const hand = Hand.create();

    // Act
    const total = hand.calculateTotal();

    // Assert
    expect(total).toBe(0);
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
  }[])("The total of a hand without any ace cards.", ({ cards, expected }) => {
    // Arrange
    let hand = Hand.create();
    for (const card of cards) {
      hand = hand.add(card);
    }

    // Act
    const total = hand.calculateTotal();

    // Assert
    expect(total).toBe(expected);
  });

  test.each([
    {
      cards: [
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Two, Suit.Spade),
        new Card(Rank.Three, Suit.Spade),
      ],
      expected: 16,
    },
    {
      cards: [new Card(Rank.Ace, Suit.Spade)],
      expected: 11,
    },
    {
      cards: [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ace, Suit.Spade)],
      expected: 12,
    },
    {
      cards: [
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Ace, Suit.Spade),
        new Card(Rank.Ace, Suit.Spade),
      ],
      expected: 13,
    },
  ] as {
    cards: Card[];
    expected: number;
  }[])("The total of a hand with some ace cards.", ({ cards, expected }) => {
    // Arrange
    let hand = Hand.create();
    for (const card of cards) {
      hand = hand.add(card);
    }

    // Act
    const total = hand.calculateTotal();

    // Assert
    expect(total).toBe(expected);
  });
});

describe("calculate soft total", () => {
  test("The soft total is undefined if the hand does not contain aces.", () => {
    // Arrange
    const hand = Hand.create().add(new Card(Rank.Two, Suit.Spade));

    // Act
    const softTotal = hand.calculateSoftTotal();

    // Assert
    expect(softTotal).toBeUndefined();
  });

  test("The soft total is undefined if considering the point of one ace to be 11 results in the total exceeding 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Ace, Suit.Spade))
      .add(new Card(Rank.Nine, Suit.Spade))
      .add(new Card(Rank.Nine, Suit.Spade));

    // Act
    const softTotal = hand.calculateSoftTotal();

    // Assert
    expect(softTotal).toBeUndefined();
  });

  test("The soft total is defined if the hand contains aces.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Ace, Suit.Spade))
      .add(new Card(Rank.Two, Suit.Spade));

    // Act
    const softTotal = hand.calculateSoftTotal();

    // Assert
    expect(softTotal).toBe(13);
  });

  test("Only one ace is considered 11 even if the hand contains multiple aces.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Ace, Suit.Spade))
      .add(new Card(Rank.Ace, Suit.Spade))
      .add(new Card(Rank.Two, Suit.Spade));

    // Act
    const softTotal = hand.calculateSoftTotal();

    // Assert
    expect(softTotal).toBe(14);
  });
});

describe("count", () => {
  test("The count of empty hand is 0.", () => {
    // Arrange
    const hand = Hand.create();

    // Act
    const count = hand.count();

    // Assert
    expect(count).toBe(0);
  });

  test("The count of a hand with one card is 1.", () => {
    // Arrange
    const hand = Hand.create().add(new Card(Rank.Ace, Suit.Spade));

    // Act
    const count = hand.count();

    // Assert
    expect(count).toBe(1);
  });

  test("The count of a hand with two cards is 2.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Ace, Suit.Spade))
      .add(new Card(Rank.Ace, Suit.Spade));

    // Act
    const count = hand.count();

    // Assert
    expect(count).toBe(2);
  });
});

describe("is black jack", () => {
  test("The hand is black jack if the count is 2 and the soft total is 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Ace, Suit.Spade))
      .add(new Card(Rank.Jack, Suit.Spade));

    // Act, Assert
    expect(hand.isBlackJack()).toBe(true);
  });

  test("The hand is not black jack if the count is 2 and the soft total is not 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Ace, Suit.Spade))
      .add(new Card(Rank.Two, Suit.Spade));

    // Act, Assert
    expect(hand.isBlackJack()).toBe(false);
  });

  test("The hand is not black jack if the count is not 2 and the soft total is 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Two, Suit.Spade))
      .add(new Card(Rank.Nine, Suit.Spade))
      .add(new Card(Rank.Ten, Suit.Spade));

    // Act, Assert
    expect(hand.isBlackJack()).toBe(false);
  });
});

describe("is bust", () => {
  test("The hand is bust if the hard total is greater than 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Jack, Suit.Spade))
      .add(new Card(Rank.Jack, Suit.Spade))
      .add(new Card(Rank.Jack, Suit.Spade));

    // Act, Assert
    expect(hand.isBust()).toBe(true);
  });

  test("The hand is not bust if the soft total is less than equal 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Jack, Suit.Spade))
      .add(new Card(Rank.Ace, Suit.Spade));

    // Act, Assert
    expect(hand.isBust()).toBe(false);
  });

  test("The hand is not bust if the soft total is greater than 21 but the hard total is less than equal 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Jack, Suit.Spade))
      .add(new Card(Rank.Jack, Suit.Spade))
      .add(new Card(Rank.Ace, Suit.Spade));

    // Act, Assert
    expect(hand.isBust()).toBe(false);
  });
});

describe("can hit", () => {
  test("Can hit if the soft total is less than 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Jack, Suit.Spade))
      .add(new Card(Rank.Jack, Suit.Spade));

    // Act, Assert
    expect(hand.canHit()).toBe(true);
  });

  test("Can hit if the soft total is greater than 21 but the hard total is less than 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Ace, Suit.Spade))
      .add(new Card(Rank.Ace, Suit.Spade));

    // Act, Assert
    expect(hand.canHit()).toBe(true);
  });

  test("Cannot hit if the hand is black jack.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Jack, Suit.Spade))
      .add(new Card(Rank.Ace, Suit.Spade));

    // Act, Assert
    expect(hand.canHit()).toBe(false);
  });

  test("Cannot hit if the hand is not black jack but the soft total is 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Two, Suit.Spade))
      .add(new Card(Rank.Eight, Suit.Spade))
      .add(new Card(Rank.Ace, Suit.Spade));

    // Act, Assert
    expect(hand.canHit()).toBe(false);
  });

  test("Cannot hit if the hard total is greater than equal 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Jack, Suit.Spade))
      .add(new Card(Rank.Jack, Suit.Spade))
      .add(new Card(Rank.Ace, Suit.Spade));

    // Act, Assert
    expect(hand.canHit()).toBe(false);
  });

  test("Cannot hit if the soft total is less than 21 but the hand is stand.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Jack, Suit.Spade))
      .add(new Card(Rank.Jack, Suit.Spade))
      .stand();

    // Act, Assert
    expect(hand.canHit()).toBe(false);
  });
});

describe("is resolved", () => {
  test("The hand is resolved if the soft total is 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Ace, Suit.Spade))
      .add(new Card(Rank.Jack, Suit.Spade));

    // Act, Assert
    expect(hand.isResolved()).toBe(true);
  });

  test("The hand is resolved if the hard total is 21.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Two, Suit.Spade))
      .add(new Card(Rank.Nine, Suit.Spade))
      .add(new Card(Rank.Ten, Suit.Spade));

    // Act, Assert
    expect(hand.isResolved()).toBe(true);
  });

  test("The hand is resolved if the hand is stand.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Two, Suit.Spade))
      .add(new Card(Rank.Two, Suit.Spade))
      .stand();

    // Act, Assert
    expect(hand.isResolved()).toBe(true);
  });

  test("The hand is resolved if the hand is bust.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Ten, Suit.Spade))
      .add(new Card(Rank.Ten, Suit.Spade))
      .add(new Card(Rank.Ten, Suit.Spade));

    // Act, Assert
    expect(hand.isResolved()).toBe(true);
  });

  test("The hand is not resolved if the hard total is less than 21 and the hand is not stand.", () => {
    // Arrange
    const hand = Hand.create()
      .add(new Card(Rank.Ten, Suit.Spade))
      .add(new Card(Rank.Ten, Suit.Spade));

    // Act, Assert
    expect(hand.isResolved()).toBe(false);
  });
});
