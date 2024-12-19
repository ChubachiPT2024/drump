import { describe, expect, test } from "vitest";
import { Player } from "./player";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";
import { HandSignal } from "../handSignals/handSignal";
import { PlayerId } from "./playerId";
import { UserId } from "../users/userId";

describe("add card to hand", () => {
  test("It adds a card to the hand.", () => {
    const player = Player.create(
      new PlayerId("playerId"),
      new UserId("UserId"),
    );

    player.addCardToHand(new Card(Rank.Ace, Suit.Spade));

    expect(player.getHand().count()).toBe(1);
  });
});

describe("get hand signal options", () => {
  test("Can hit if the hand is not resolved", () => {
    const player = Player.create(
      new PlayerId("playerId"),
      new UserId("UserId"),
    );
    player.addCardToHand(new Card(Rank.Two, Suit.Spade));
    player.addCardToHand(new Card(Rank.Three, Suit.Spade));

    const options = player.getHandSignalOptions();

    expect(options).toContain(HandSignal.Hit);
  });

  test("Can stand if the hand is not resolved", () => {
    const player = Player.create(
      new PlayerId("playerId"),
      new UserId("UserId"),
    );
    player.addCardToHand(new Card(Rank.Two, Suit.Spade));
    player.addCardToHand(new Card(Rank.Three, Suit.Spade));

    const options = player.getHandSignalOptions();

    expect(options).toContain(HandSignal.Stand);
  });

  test("There are no hand signal options if the hand is resolved", () => {
    const player = Player.create(
      new PlayerId("playerId"),
      new UserId("UserId"),
    );
    player.addCardToHand(new Card(Rank.Two, Suit.Spade));
    player.addCardToHand(new Card(Rank.Three, Suit.Spade));
    player.stand();

    const options = player.getHandSignalOptions();

    expect(options).toHaveLength(0);
  });
});
