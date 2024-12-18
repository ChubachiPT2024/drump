import { describe, expect, test } from "vitest";
import { RoundPlayer } from "./roundPlayer";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";
import { HandSignal } from "../handSignals/handSignal";

describe("get hand signal options", () => {
  test("Can hit if the hand is not resolved", () => {
    const roundPlayer = RoundPlayer.create();
    roundPlayer.addCardToHand(new Card(Rank.Two, Suit.Spade));
    roundPlayer.addCardToHand(new Card(Rank.Three, Suit.Spade));

    const options = roundPlayer.getHandSignalOptions();

    expect(options).toContain(HandSignal.Hit);
  });

  test("Can stand if the hand is not resolved", () => {
    const roundPlayer = RoundPlayer.create();
    roundPlayer.addCardToHand(new Card(Rank.Two, Suit.Spade));
    roundPlayer.addCardToHand(new Card(Rank.Three, Suit.Spade));

    const options = roundPlayer.getHandSignalOptions();

    expect(options).toContain(HandSignal.Stand);
  });

  test("There are no hand signal options if the hand is resolved", () => {
    const roundPlayer = RoundPlayer.create();
    roundPlayer.addCardToHand(new Card(Rank.Two, Suit.Spade));
    roundPlayer.addCardToHand(new Card(Rank.Three, Suit.Spade));
    roundPlayer.stand();

    const options = roundPlayer.getHandSignalOptions();

    expect(options).toHaveLength(0);
  });
});
