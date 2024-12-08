import { InMemoryMatchFactory } from "@/infrastructure/inMemory/matches/inMemoryMatchFactory";
import { InMemoryMatchRepository } from "@/infrastructure/inMemory/matches/inMemoryMatchRepository";
import { describe, expect, test } from "vitest";
import { MatchApplicationService } from "./matchApplicationService";
import { MatchCreateCommand } from "./Create/matchCreateCommand";
import { MatchId } from "@/domain/models/matches/matchId";
import { Match } from "@/domain/models/matches/match";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { MatchAddRoundCommand } from "./AddRound/matchAddRoundCommand";
import { Round } from "@/domain/models/rounds/round";
import { RoundId } from "@/domain/models/rounds/roundId";
import { Hand } from "@/domain/models/hands/hand";

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

describe("add round", () => {
  test("Can add a round", async () => {
    // Arrange
    const matchFactory = new InMemoryMatchFactory();
    const matchRepository = new InMemoryMatchRepository();
    const match = new Match(new MatchId("matchId"), new ShoeId("shoeId"), []);
    await matchRepository.saveAsync(match);
    const service = new MatchApplicationService(matchFactory, matchRepository);
    const round = new Round(
      new RoundId("roundId"),
      match.shoeId,
      new Hand([], false),
      new Hand([], false),
    );

    // Act
    await service.addRoundAsync(
      new MatchAddRoundCommand(match.id.value, round.id.value),
    );

    // Assert
    const modifiedMatch = await matchRepository.findAsync(match.id);
    expect(modifiedMatch.getRoundIds().length).toBe(1);
    expect(modifiedMatch.getRoundIds()[0].value).toBe(round.id.value);
  });
});
