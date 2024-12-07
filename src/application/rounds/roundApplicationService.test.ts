import { InMemoryRoundFactory } from "@/infrastructure/inMemory/rounds/inMemoryRoundFactory";
import { InMemoryRoundRepository } from "@/infrastructure/inMemory/rounds/inMemoryRoundRepository";
import { describe, expect, test } from "vitest";
import { RoundApplicationService } from "./roundApplicationService";
import { InMemoryShoeRepository } from "@/infrastructure/inMemory/shoes/inMemoryShoeRepository";
import { InMemoryShoeFactory } from "@/infrastructure/inMemory/shoes/inMemoryShoeFactory";
import { Deck } from "@/domain/models/decks/deck";
import { RoundStartCommand } from "./roundStartCommand";
import { RoundGetPlayerHandCommand } from "./roundGetPlayerHandCommand";
import { Card } from "@/domain/models/cards/card";
import { Rank } from "@/domain/models/ranks/rank";
import { Suit } from "@/domain/models/suits/suit";

describe("start", () => {
  test("The dealer and player gets a hand with two cards.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id);
    await roundRepository.saveAsync(round);

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
    );

    // Act
    await service.startAsync(new RoundStartCommand(round.id.value));

    // Assert
    const startedRound = await roundRepository.findAsync(round.id);
    expect(startedRound.getDealerHand().count()).toBe(2);
    expect(startedRound.getPlayerHand().count()).toBe(2);
  });
});

describe("get player hand", () => {
  test("Can get the player hand.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id);
    await roundRepository.saveAsync(round);

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    const result = await service.getPlayerHandAsync(
      new RoundGetPlayerHandCommand(round.id.value),
    );

    // Assert
    const startedRound = await roundRepository.findAsync(round.id);
    const playerHand = startedRound.getPlayerHand();
    expect(result.cards.length).toBe(playerHand.count());
    for (let i = 0; i < result.cards.length; i++) {
      expect(result.cards[i].rank).toBe(playerHand.getCards()[i].rank);
      expect(result.cards[i].suit).toBe(playerHand.getCards()[i].suit);
    }
  });
});
