import { describe, expect, test } from "vitest";
import { RoundDealer } from "./roundDealer";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";

describe("add card to hand", () => {
  test("It adds a card to the hand.", () => {
    const roundDealer = RoundDealer.create();

    roundDealer.addCardToHand(new Card(Rank.Ace, Suit.Spade));

    expect(roundDealer.getHand().count()).toBe(1);
  });
});

describe("get up card", () => {
  test("The up card is the first card of the dealer hand.", () => {
    const roundDealer = RoundDealer.create();
    roundDealer.addCardToHand(new Card(Rank.Ace, Suit.Spade));
    roundDealer.addCardToHand(new Card(Rank.Two, Suit.Diamond));

    const upCard = roundDealer.getUpCard();

    expect(upCard.rank).toBe(Rank.Ace);
    expect(upCard.suit).toBe(Suit.Spade);
  });
});

describe("should hit", () => {
  test("Should hit if the soft total is less than 17.", () => {
    const roundDealer = RoundDealer.create();
    roundDealer.addCardToHand(new Card(Rank.Ace, Suit.Spade));
    roundDealer.addCardToHand(new Card(Rank.Five, Suit.Spade));

    const shouldHit = roundDealer.shouldHit();

    expect(shouldHit).toBe(true);
  });

  test("Should not hit if the soft total is greater than equal 17 and the soft total is less than 21.", () => {
    const roundDealer = RoundDealer.create();
    roundDealer.addCardToHand(new Card(Rank.Ace, Suit.Spade));
    roundDealer.addCardToHand(new Card(Rank.Six, Suit.Spade));

    const shouldHit = roundDealer.shouldHit();

    expect(shouldHit).toBe(false);
  });

  test("Should hit if the soft total is greater than 21 and the soft total is less than 17.", () => {
    const roundDealer = RoundDealer.create();
    roundDealer.addCardToHand(new Card(Rank.Ace, Suit.Spade));
    roundDealer.addCardToHand(new Card(Rank.Six, Suit.Spade));
    roundDealer.addCardToHand(new Card(Rank.Seven, Suit.Spade));

    const shouldHit = roundDealer.shouldHit();

    expect(shouldHit).toBe(true);
  });

  test("The dealer should not hit if the hard total is greater than equal 17.", () => {
    const roundDealer = RoundDealer.create();
    roundDealer.addCardToHand(new Card(Rank.Ace, Suit.Spade));
    roundDealer.addCardToHand(new Card(Rank.Six, Suit.Spade));
    roundDealer.addCardToHand(new Card(Rank.Ten, Suit.Spade));

    const shouldHit = roundDealer.shouldHit();

    expect(shouldHit).toBe(false);
  });
});
