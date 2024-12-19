import { InMemoryPlayerFactory } from "@/infrastructure/inMemory/players/inMemoryPlayerFactory";
import { InMemoryPlayerRepository } from "@/infrastructure/inMemory/players/inMemoryPlayerRepository";
import { describe, expect, test } from "vitest";
import { PlayerApplicationService } from "./playerApplicationService";
import { PlayerCreateCommand } from "./Create/playerCreateCommand";
import { PlayerId } from "@/domain/models/players/playerId";
import { UserId } from "@/domain/models/users/userId";
import { PlayerGetHandCommand } from "./GetHand/playerGetHandCommand";
import { Card } from "@/domain/models/cards/card";
import { Rank } from "@/domain/models/ranks/rank";
import { Suit } from "@/domain/models/suits/suit";

describe("create", () => {
  test("Can create a player", async () => {
    const playerFactory = new InMemoryPlayerFactory();
    const playerRepository = new InMemoryPlayerRepository();
    const service = new PlayerApplicationService(
      playerFactory,
      playerRepository,
    );

    const result = await service.createAsync(new PlayerCreateCommand("userId"));

    const player = await playerRepository.findAsync(new PlayerId(result.id));
    expect(player).toBeDefined();
  });
});

describe("get hand", () => {
  test("Can get the hand.", async () => {
    // Arrange
    const playerRepository = new InMemoryPlayerRepository();
    const playerFactory = new InMemoryPlayerFactory();
    const player = playerFactory.create(new UserId("userId"));
    player.addCardToHand(new Card(Rank.Ace, Suit.Spade));
    player.addCardToHand(new Card(Rank.Two, Suit.Diamond));

    await playerRepository.saveAsync(player);

    const service = new PlayerApplicationService(
      playerFactory,
      playerRepository,
    );

    // Act
    const result = await service.getHandAsync(
      new PlayerGetHandCommand(player.id.value),
    );

    // Assert
    expect(result.cards.length).toBe(player.getHand().count());
    for (let i = 0; i < result.cards.length; i++) {
      expect(result.cards[i].rank).toBe(player.getHand().getCards()[i].rank);
      expect(result.cards[i].suit).toBe(player.getHand().getCards()[i].suit);
    }
    expect(result.total).toBe(player.getHand().calculateTotal());
    expect(result.isResolved).toBe(player.getHand().isResolved());
  });
});
