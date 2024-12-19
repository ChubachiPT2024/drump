import { InMemoryPlayerFactory } from "@/infrastructure/inMemory/players/inMemoryPlayerFactory";
import { InMemoryPlayerRepository } from "@/infrastructure/inMemory/players/inMemoryPlayerRepository";
import { describe, expect, test } from "vitest";
import { PlayerApplicationService } from "./playerApplicationService";
import { PlayerCreateCommand } from "./Create/playerCreateCommand";
import { PlayerId } from "@/domain/models/players/playerId";

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
