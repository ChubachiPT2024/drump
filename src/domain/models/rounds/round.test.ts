import { describe, expect, test } from "vitest";
import { Round } from "./round";
import { RoundId } from "./roundId";
import { ShoeId } from "../shoes/shoeId";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";

describe("deal card to dealer", () => {
  test("It adds a card to the dealer hand.", () => {
    const round = Round.create(new RoundId("roundId"), new ShoeId("shoeId"));

    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));

    expect(round.getDealersHand().count()).toBe(1);
  });
});

describe("deal card to player", () => {
  test("It adds a card to the player hand.", () => {
    const round = Round.create(new RoundId("roundId"), new ShoeId("shoeId"));

    round.dealCardToPlayer(new Card(Rank.Ace, Suit.Spade));

    expect(round.getPlayersHand().count()).toBe(1);
  });
});

describe("get up card", () => {
  test("The up card is the first card of the dealer hand.", () => {
    const round = Round.create(new RoundId("roundId"), new ShoeId("shoeId"));
    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));

    const upCard = round.getUpCard();

    expect(upCard.rank).toBe(Rank.Ace);
    expect(upCard.suit).toBe(Suit.Spade);
  });
});

describe("should dealer hit", () => {
  test("The dealer should hit if the soft total is less than 17.", () => {
    const round = Round.create(new RoundId("roundId"), new ShoeId("shoeId"));
    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Five, Suit.Spade));

    expect(round.shouldDealerHit()).toBe(true);
  });

  test("The dealer should not hit if the soft total is greater than equal 17 and the soft total is less than 21.", () => {
    const round = Round.create(new RoundId("roundId"), new ShoeId("shoeId"));
    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Six, Suit.Spade));

    expect(round.shouldDealerHit()).toBe(false);
  });

  test("The dealer should hit if the soft total is greater than 21 and the soft total is less than 17.", () => {
    const round = Round.create(new RoundId("roundId"), new ShoeId("shoeId"));
    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Six, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Seven, Suit.Spade));

    expect(round.shouldDealerHit()).toBe(true);
  });

  test("The dealer should not hit if the hard total is greater than equal 17.", () => {
    const round = Round.create(new RoundId("roundId"), new ShoeId("shoeId"));
    round.dealCardToDealer(new Card(Rank.Ace, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Six, Suit.Spade));
    round.dealCardToDealer(new Card(Rank.Ten, Suit.Spade));

    expect(round.shouldDealerHit()).toBe(false);
  });
});
