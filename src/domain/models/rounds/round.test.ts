import { describe, expect, test } from "vitest";
import { Round } from "./round";
import { RoundId } from "./roundId";
import { ShoeId } from "../shoes/shoeId";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";
import { Hand } from "../hands/hand";

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
