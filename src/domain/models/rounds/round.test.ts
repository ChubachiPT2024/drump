import { describe, expect, test } from "vitest";
import { Round } from "./round";
import { RoundId } from "./roundId";
import { ShoeId } from "../shoes/shoeId";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";
import { RoundResult } from "../roundResults/roundResult";

describe("deal card to dealer", () => {
  test("It adds a card to the dealer hand.", () => {
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new Hand([], false),
      new Hand([], false),
    );

    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));

    expect(round.getDealerHand().count()).toBe(1);
  });
});

describe("deal card to player", () => {
  test("It adds a card to the player hand.", () => {
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new Hand([], false),
      new Hand([], false),
    );

    round.dealCardToPlayer(new Card(Rank.Ace, Suit.Spade));

    expect(round.getPlayerHand().count()).toBe(1);
  });
});

describe("get player hand signal options", () => {
  test("A player can hit if the hand is not resolved", () => {
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new Hand([], false),
      new Hand(
        [new Card(Rank.Two, Suit.Spade), new Card(Rank.Three, Suit.Spade)],
        false,
      ),
    );

    const options = round.getPlayerHandSignalOptions();

    expect(options).toContain(HandSignal.Hit);
  });

  test("A player can hit if the hand is not resolved", () => {
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new Hand([], false),
      new Hand(
        [new Card(Rank.Two, Suit.Spade), new Card(Rank.Three, Suit.Spade)],
        false,
      ),
    );

    const options = round.getPlayerHandSignalOptions();

    expect(options).toContain(HandSignal.Stand);
  });

  test("A player has no hand signal options if the hand is resolved", () => {
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new Hand([], false),
      new Hand(
        [new Card(Rank.Two, Suit.Spade), new Card(Rank.Three, Suit.Spade)],
        true,
      ),
    );

    const options = round.getPlayerHandSignalOptions();

    expect(options).toHaveLength(0);
  });
});

describe("get up card", () => {
  test("The up card is the first card of the dealer hand.", () => {
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new Hand([], false),
      new Hand([], false),
    );
    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));

    const upCard = round.getUpCard();

    expect(upCard.rank).toBe(Rank.Ace);
    expect(upCard.suit).toBe(Suit.Spade);
  });
});

describe("should dealer hit", () => {
  test("The dealer should hit if the soft total is less than 17.", () => {
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new Hand([], false),
      new Hand([], false),
    );
    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Five, Suit.Spade));

    expect(round.shouldDealerHit()).toBe(true);
  });

  test("The dealer should not hit if the soft total is greater than equal 17 and the soft total is less than 21.", () => {
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new Hand([], false),
      new Hand([], false),
    );
    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Six, Suit.Spade));

    expect(round.shouldDealerHit()).toBe(false);
  });

  test("The dealer should hit if the soft total is greater than 21 and the soft total is less than 17.", () => {
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new Hand([], false),
      new Hand([], false),
    );
    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Six, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Seven, Suit.Spade));

    expect(round.shouldDealerHit()).toBe(true);
  });

  test("The dealer should not hit if the hard total is greater than equal 17.", () => {
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new Hand([], false),
      new Hand([], false),
    );
    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Six, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Ten, Suit.Spade));

    expect(round.shouldDealerHit()).toBe(false);
  });
});

describe("calculate result", () => {
  test.each([
    // プレイヤー: バスト, ディーラー: バスト
    {
      playersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
        ],
        false,
      ),
      dealersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Seven, Suit.Spade),
          new Card(Rank.Seven, Suit.Spade),
        ],
        false,
      ),
      expected: RoundResult.Loss,
    },
    // プレイヤー: バスト, ディーラー: ブラックジャック
    {
      playersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
        ],
        false,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      expected: RoundResult.Loss,
    },
    // プレイヤー: バスト, ディーラー: ブラックジャック以外の 21 以下
    {
      playersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
        ],
        false,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      expected: RoundResult.Loss,
    },
    // プレイヤー: ブラックジャック, ディーラー: バスト
    {
      playersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      dealersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Ten, Suit.Spade),
        ],
        false,
      ),
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック, ディーラー: ブラックジャック以外の 21 以下
    {
      playersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック, ディーラー: ブラックジャック
    {
      playersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      expected: RoundResult.Push,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: バスト
    {
      playersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      dealersHand: new Hand(
        [
          new Card(Rank.Ten, Suit.Spade),
          new Card(Rank.Seven, Suit.Spade),
          new Card(Rank.Seven, Suit.Spade),
        ],
        false,
      ),
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック
    {
      playersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ace, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        false,
      ),
      expected: RoundResult.Loss,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック以外の 21 以下, (プレイヤーのトータル) > (ディーラーのトータル)
    {
      playersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Nine, Suit.Spade)],
        true,
      ),
      expected: RoundResult.Win,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック以外の 21 以下, (プレイヤーのトータル) = (ディーラーのトータル)
    {
      playersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Nine, Suit.Spade)],
        true,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Nine, Suit.Spade)],
        true,
      ),
      expected: RoundResult.Push,
    },
    // プレイヤー: ブラックジャック以外の 21 以下, ディーラー: ブラックジャック以外の 21 以下, (プレイヤーのトータル) < (ディーラーのトータル)
    {
      playersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Nine, Suit.Spade)],
        true,
      ),
      dealersHand: new Hand(
        [new Card(Rank.Ten, Suit.Spade), new Card(Rank.Ten, Suit.Spade)],
        true,
      ),
      expected: RoundResult.Loss,
    },
  ] as {
    playersHand: Hand;
    dealersHand: Hand;
    expected: RoundResult;
  }[])("The result of a round.", ({ playersHand, dealersHand, expected }) => {
    // Arrange
    const round = new Round(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      dealersHand,
      playersHand,
    );

    // Act
    const result = round.calculateResult();

    // Assert
    expect(result).toBe(expected);
  });
});
