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
    const result = await service.getPlayersHandAsync(
      new RoundGetPlayersHandCommand(round.id.value),
    );

    // Assert
    const startedRound = await roundRepository.findAsync(round.id);
    const playerHand = startedRound.getPlayerHand();
    expect(result.cards.length).toBe(playerHand.count());
    for (let i = 0; i < result.cards.length; i++) {
      expect(result.cards[i].rank).toBe(playerHand.getCards()[i].rank);
      expect(result.cards[i].suit).toBe(playerHand.getCards()[i].suit);
    }
    expect(result.total).toBe(playerHand.calculateTotal());
    expect(result.isResolved).toBe(playerHand.isResolved());
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

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    const beforeCount = (await roundRepository.findAsync(round.id))
      .getPlayerHand()
      .count();

    // Act
    await service.hitAsync(new RoundHitCommand(round.id.value));

    // Assert
    const afterCount = (await roundRepository.findAsync(round.id))
      .getPlayerHand()
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

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    await service.standAsync(new RoundStandCommand(round.id.value));

    // Assert
    expect(
      (await roundRepository.findAsync(round.id)).getPlayerHand().isResolved(),
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

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
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

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    await service.completeAsync(new RoundCompleteCommand(round.id.value));

    // Assert
    expect(
      (await roundRepository.findAsync(round.id)).getDealerHand().isResolved(),
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

    const service = new RoundApplicationService(
      roundFactory,
      roundRepository,
      shoeRepository,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    const result = await service.getDealersHandAsync(
      new RoundGetDealersHandCommand(round.id.value),
    );

    // Assert
    const dealersHand = (
      await roundRepository.findAsync(round.id)
    ).getDealerHand();
    expect(result.cards.length).toBe(dealersHand.count());
    for (let i = 0; i < result.cards.length; i++) {
      expect(result.cards[i].rank).toBe(dealersHand.getCards()[i].rank);
      expect(result.cards[i].suit).toBe(dealersHand.getCards()[i].suit);
    }
    expect(result.total).toBe(dealersHand.calculateTotal());
    expect(result.isResolved).toBe(dealersHand.isResolved());
  });
});
