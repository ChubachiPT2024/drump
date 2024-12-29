import { describe, expect, test } from "vitest";
import { Player } from "./player";
import { Card } from "../cards/card";
import { Rank } from "../ranks/rank";
import { Suit } from "../suits/suit";
import { HandSignal } from "../handSignals/handSignal";
import { PlayerId } from "./playerId";
import { UserId } from "../users/userId";
import { ChipAmount } from "../chipAmounts/chipAmount";
import { PlayerCreditShortageError } from "./playerCreditShortageError";

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

describe("bet", () => {
  test("Can bet an amount of chips that is less than or equal to the credit.", () => {
    const player = Player.create(
      new PlayerId("playerId"),
      new UserId("UserId"),
    );
    const beforeCredit = player.getCredit();
    const betAmount = new ChipAmount(1);

    player.bet(betAmount);

    expect(player.getCredit().value).toBe(beforeCredit.minus(betAmount).value);
    expect(player.getBetAmount().value).toBe(betAmount.value);
  });

  test("Cannot bet an amount of chips that is greater than the credit.", () => {
    const player = Player.create(
      new PlayerId("playerId"),
      new UserId("UserId"),
    );
    const betAmount = player.getCredit().plus(new ChipAmount(1));

    try {
      player.bet(betAmount);
    } catch (err) {
      expect(err).toBeInstanceOf(PlayerCreditShortageError);
    }
  });
});

describe("collect payoff", () => {
  test("It adds an amount of chips to the credit.", () => {
    const player = Player.create(
      new PlayerId("playerId"),
      new UserId("UserId"),
    );
    const beforeCredit = player.getCredit();
    const amount = new ChipAmount(1);

    player.collectPayoff(amount);

    expect(player.getCredit().value).toBe(beforeCredit.plus(amount).value);
  });
});

describe("collect bet", () => {
  test("It collects the betting chips and adds them to the credit.", () => {
    const player = Player.create(
      new PlayerId("playerId"),
      new UserId("UserId"),
    );
    const betAmount = new ChipAmount(1);
    player.bet(betAmount);
    const beforeCredit = player.getCredit();

    player.collectBet();

    expect(player.getCredit().value).toBe(beforeCredit.plus(betAmount).value);
    expect(player.getBetAmount().value).toBe(0);
  });
});

describe("lose bet", () => {
  test("It loses the betting chips.", () => {
    const player = Player.create(
      new PlayerId("playerId"),
      new UserId("UserId"),
    );
    const betAmount = new ChipAmount(1);
    player.bet(betAmount);

    player.loseBet();

    expect(player.getBetAmount().value).toBe(0);
  });
});

describe("discard", () => {
  test("It discards the current hand and get a new empty hand.", () => {
    const player = Player.create(
      new PlayerId("playerId"),
      new UserId("UserId"),
    );
    player.addCardToHand(new Card(Rank.Ace, Suit.Spade));

    player.discard();

    expect(player.getHand().count()).toBe(0);
  });
});
