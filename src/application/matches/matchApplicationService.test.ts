import { InMemoryMatchFactory } from "@/infrastructure/inMemory/matches/inMemoryMatchFactory";
import { InMemoryMatchRepository } from "@/infrastructure/inMemory/matches/inMemoryMatchRepository";
import { describe, expect, test } from "vitest";
import { MatchApplicationService } from "./matchApplicationService";
import { MatchCreateCommand } from "./matchCreateCommand";
import { MatchId } from "@/domain/models/matches/matchId";

describe("create", () => {
  test("Can create a match", async () => {
    const matchFactory = new InMemoryMatchFactory();
    const matchRepository = new InMemoryMatchRepository();
    const service = new MatchApplicationService(matchFactory, matchRepository);

    const result = await service.createAsync(new MatchCreateCommand("shoeId"));

    const match = await matchRepository.findAsync(new MatchId(result.id));
    expect(match).toBeDefined();
  });
});
