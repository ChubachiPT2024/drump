import { InMemoryRoundFactory } from "@/infrastructure/inMemory/rounds/inMemoryRoundFactory";
import { InMemoryRoundRepository } from "@/infrastructure/inMemory/rounds/inMemoryRoundRepository";
import { describe, expect, test } from "vitest";
import { RoundApplicationService } from "./roundApplicationService";
import { InMemoryShoeRepository } from "@/infrastructure/inMemory/shoes/inMemoryShoeRepository";
import { InMemoryShoeFactory } from "@/infrastructure/inMemory/shoes/inMemoryShoeFactory";
import { Deck } from "@/domain/models/decks/deck";
import { RoundStartCommand } from "./Start/roundStartCommand";
import { RoundGetPlayersHandCommand } from "./GetPlayersHand/roundGetPlayersHandCommand";
import { RoundHitCommand } from "./Hit/roundHitCommand";
import { RoundStandCommand } from "./Stand/roundStandCommand";
import { RoundGetUpCardCommand } from "./GetUpCard/roundGetUpCardCommand";
import { RoundCompleteCommand } from "./Complete/roundCompleteCommand";
import { RoundGetDealersHandCommand } from "./GetDealersHand/roundGetDealersHandCommand";
import { RoundService } from "@/domain/services/roundService";

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

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
      roundService,
    );

    // Act
    await service.startAsync(new RoundStartCommand(round.id.value));

    // Assert
    const startedRound = await roundRepository.findAsync(round.id);
    expect(startedRound.getDealersHand().count()).toBe(2);
    expect(startedRound.getPlayersHand().count()).toBe(2);
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

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    const result = await service.getPlayersHandAsync(
      new RoundGetPlayersHandCommand(round.id.value),
    );

    // Assert
    const startedRound = await roundRepository.findAsync(round.id);
    const playersHand = startedRound.getPlayersHand();
    expect(result.cards.length).toBe(playersHand.count());
    for (let i = 0; i < result.cards.length; i++) {
      expect(result.cards[i].rank).toBe(playersHand.getCards()[i].rank);
      expect(result.cards[i].suit).toBe(playersHand.getCards()[i].suit);
    }
    expect(result.total).toBe(playersHand.calculateTotal());
    expect(result.isResolved).toBe(playersHand.isResolved());
  });
});

describe("hit", () => {
  test("The player gets a new card.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    const beforeCount = (await roundRepository.findAsync(round.id))
      .getPlayersHand()
      .count();

    // Act
    await service.hitAsync(new RoundHitCommand(round.id.value));

    // Assert
    const afterCount = (await roundRepository.findAsync(round.id))
      .getPlayersHand()
      .count();
    expect(afterCount).toBe(beforeCount + 1);
  });
});

describe("stand", () => {
  test("The player hand becomes resolved.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    await service.standAsync(new RoundStandCommand(round.id.value));

    // Assert
    expect(
      (await roundRepository.findAsync(round.id)).getPlayersHand().isResolved(),
    ).toBe(true);
  });
});

describe("get up card", () => {
  test("Can get the up card.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    const result = await service.getUpCardAsync(
      new RoundGetUpCardCommand(round.id.value),
    );

    // Assert
    expect(result.rank).toBe(round.getUpCard().rank);
    expect(result.suit).toBe(round.getUpCard().suit);
  });
});

describe("complete", () => {
  test("The dealer's hand becomes resolved.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    await service.completeAsync(new RoundCompleteCommand(round.id.value));

    // Assert
    expect(
      (await roundRepository.findAsync(round.id)).getDealersHand().isResolved(),
    ).toBe(true);
  });
});

describe("get dealear's hand", () => {
  test("Can get the dealer's hand.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    const result = await service.getDealersHandAsync(
      new RoundGetDealersHandCommand(round.id.value),
    );

    // Assert
    const dealersHand = (
      await roundRepository.findAsync(round.id)
    ).getDealersHand();
    expect(result.cards.length).toBe(dealersHand.count());
    for (let i = 0; i < result.cards.length; i++) {
      expect(result.cards[i].rank).toBe(dealersHand.getCards()[i].rank);
      expect(result.cards[i].suit).toBe(dealersHand.getCards()[i].suit);
    }
    expect(result.total).toBe(dealersHand.calculateTotal());
    expect(result.isResolved).toBe(dealersHand.isResolved());
  });
});
