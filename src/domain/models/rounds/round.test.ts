import { describe, expect, test } from "vitest";
import { Round } from "./round";
import { RoundId } from "./roundId";
import { ShoeId } from "../shoes/shoeId";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";
import { Hand } from "../hands/hand";
import { HandSignal } from "../handSignals/handSignal";

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
