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
import { InMemoryDealerRepository } from "@/infrastructure/inMemory/dealears/inMemoryDealerRepository";
import { InMemoryDealerFactory } from "@/infrastructure/inMemory/dealears/inMemoryDealearFactory";
import { InMemoryPlayerRepository } from "@/infrastructure/inMemory/players/inMemoryPlayerRepository";
import { InMemoryPlayerFactory } from "@/infrastructure/inMemory/players/inMemoryPlayerFactory";
import { UserId } from "@/domain/models/users/userId";

describe("start", () => {
  test("The dealer and player gets a hand with two cards.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const dealerRepository = new InMemoryDealerRepository();
    const dealerFactory = new InMemoryDealerFactory();
    const dealer = dealerFactory.create();
    await dealerRepository.saveAsync(dealer);

    const playerRepository = new InMemoryPlayerRepository();
    const playerFactory = new InMemoryPlayerFactory();
    const player = playerFactory.create(new UserId("userId"));
    await playerRepository.saveAsync(player);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id, dealer.id, player.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      dealerFactory,
      playerFactory,
      roundRepository,
      shoeRepository,
      dealerRepository,
      playerRepository,
      roundService,
    );

    // Act
    await service.startAsync(new RoundStartCommand(round.id.value));

    // Assert
    const startedDealer = await dealerRepository.findAsync(dealer.id);
    expect(startedDealer.getHand().count()).toBe(2);
    expect(startedDealer.getHand().count()).toBe(2);
  });
});

describe("get player hand", () => {
  test("Can get the player hand.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const dealerRepository = new InMemoryDealerRepository();
    const dealerFactory = new InMemoryDealerFactory();
    const dealer = dealerFactory.create();
    await dealerRepository.saveAsync(dealer);

    const playerRepository = new InMemoryPlayerRepository();
    const playerFactory = new InMemoryPlayerFactory();
    const player = playerFactory.create(new UserId("userId"));
    await playerRepository.saveAsync(player);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id, dealer.id, player.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      dealerFactory,
      playerFactory,
      roundRepository,
      shoeRepository,
      dealerRepository,
      playerRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    const result = await service.getPlayersHandAsync(
      new RoundGetPlayersHandCommand(round.id.value),
    );

    // Assert
    const startedPlayer = await playerRepository.findAsync(round.playerId);
    const playersHand = startedPlayer.getHand();
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

    const dealerRepository = new InMemoryDealerRepository();
    const dealerFactory = new InMemoryDealerFactory();
    const dealer = dealerFactory.create();
    await dealerRepository.saveAsync(dealer);

    const playerRepository = new InMemoryPlayerRepository();
    const playerFactory = new InMemoryPlayerFactory();
    const player = playerFactory.create(new UserId("userId"));
    await playerRepository.saveAsync(player);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id, dealer.id, player.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      dealerFactory,
      playerFactory,
      roundRepository,
      shoeRepository,
      dealerRepository,
      playerRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    const beforeCount = (await playerRepository.findAsync(round.playerId))
      .getHand()
      .count();

    // Act
    await service.hitAsync(new RoundHitCommand(round.id.value));

    // Assert
    const afterCount = (await playerRepository.findAsync(round.playerId))
      .getHand()
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

    const dealerRepository = new InMemoryDealerRepository();
    const dealerFactory = new InMemoryDealerFactory();
    const dealer = dealerFactory.create();
    await dealerRepository.saveAsync(dealer);

    const playerRepository = new InMemoryPlayerRepository();
    const playerFactory = new InMemoryPlayerFactory();
    const player = playerFactory.create(new UserId("userId"));
    await playerRepository.saveAsync(player);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id, dealer.id, player.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      dealerFactory,
      playerFactory,
      roundRepository,
      shoeRepository,
      dealerRepository,
      playerRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    await service.standAsync(new RoundStandCommand(round.id.value));

    // Assert
    expect(
      (await playerRepository.findAsync(round.playerId)).getHand().isResolved(),
    ).toBe(true);
  });
});

describe("get up card", () => {
  test("Can get the up card.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const dealerRepository = new InMemoryDealerRepository();
    const dealerFactory = new InMemoryDealerFactory();
    const dealer = dealerFactory.create();
    await dealerRepository.saveAsync(dealer);

    const playerRepository = new InMemoryPlayerRepository();
    const playerFactory = new InMemoryPlayerFactory();
    const player = playerFactory.create(new UserId("userId"));
    await playerRepository.saveAsync(player);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id, dealer.id, player.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      dealerFactory,
      playerFactory,
      roundRepository,
      shoeRepository,
      dealerRepository,
      playerRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    const result = await service.getUpCardAsync(
      new RoundGetUpCardCommand(round.id.value),
    );

    // Assert
    expect(result.rank).toBe(dealer.getUpCard().rank);
    expect(result.suit).toBe(dealer.getUpCard().suit);
  });
});

describe("complete", () => {
  test("The dealer's hand becomes resolved.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const dealerRepository = new InMemoryDealerRepository();
    const dealerFactory = new InMemoryDealerFactory();
    const dealer = dealerFactory.create();
    await dealerRepository.saveAsync(dealer);

    const playerRepository = new InMemoryPlayerRepository();
    const playerFactory = new InMemoryPlayerFactory();
    const player = playerFactory.create(new UserId("userId"));
    await playerRepository.saveAsync(player);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id, dealer.id, player.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      dealerFactory,
      playerFactory,
      roundRepository,
      shoeRepository,
      dealerRepository,
      playerRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    await service.completeAsync(new RoundCompleteCommand(round.id.value));

    // Assert
    expect(
      (await dealerRepository.findAsync(dealer.id)).getHand().isResolved(),
    ).toBe(true);
  });
});

describe("get dealear's hand", () => {
  test("Can get the dealer's hand.", async () => {
    // Arrange
    const shoeRepository = new InMemoryShoeRepository();
    const shoe = new InMemoryShoeFactory().create(Deck.create().getCards());
    await shoeRepository.saveAsync(shoe);

    const dealerRepository = new InMemoryDealerRepository();
    const dealerFactory = new InMemoryDealerFactory();
    const dealer = dealerFactory.create();
    await dealerRepository.saveAsync(dealer);

    const playerRepository = new InMemoryPlayerRepository();
    const playerFactory = new InMemoryPlayerFactory();
    const player = playerFactory.create(new UserId("userId"));
    await playerRepository.saveAsync(player);

    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const round = roundFactory.create(shoe.id, dealer.id, player.id);
    await roundRepository.saveAsync(round);

    const roundService = new RoundService();

    const service = new RoundApplicationService(
      roundFactory,
      dealerFactory,
      playerFactory,
      roundRepository,
      shoeRepository,
      dealerRepository,
      playerRepository,
      roundService,
    );

    await service.startAsync(new RoundStartCommand(round.id.value));

    // Act
    const result = await service.getDealersHandAsync(
      new RoundGetDealersHandCommand(round.id.value),
    );

    // Assert
    const dealersHand = (await dealerRepository.findAsync(dealer.id)).getHand();
    expect(result.cards.length).toBe(dealersHand.count());
    for (let i = 0; i < result.cards.length; i++) {
      expect(result.cards[i].rank).toBe(dealersHand.getCards()[i].rank);
      expect(result.cards[i].suit).toBe(dealersHand.getCards()[i].suit);
    }
    expect(result.total).toBe(dealersHand.calculateTotal());
    expect(result.isResolved).toBe(dealersHand.isResolved());
  });
});
