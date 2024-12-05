import { InMemoryRoundFactory } from "@/infrastructure/inMemory/rounds/inMemoryRoundFactory";
import { InMemoryRoundRepository } from "@/infrastructure/inMemory/rounds/inMemoryRoundRepository";
import { describe, expect, test } from "vitest";
import { RoundApplicationService } from "./roundApplicationService";
import { RoundCreateCommand } from "./roundCreateCommand";
import { RoundId } from "@/domain/models/rounds/roundId";

describe("create", () => {
  test("Can create a round", async () => {
    const roundFactory = new InMemoryRoundFactory();
    const roundRepository = new InMemoryRoundRepository();
    const service = new RoundApplicationService(roundFactory, roundRepository);

    const result = await service.createAsync(new RoundCreateCommand("shoeId"));

    const round = await roundRepository.findAsync(new RoundId(result.id));
    expect(round).toBeDefined();
  });
});
