import { describe, expect, test } from "vitest";
import { InMemoryMatchRepository } from "./inMemoryMatchRepository";
import { Match } from "@/domain/models/matches/match";
import { MatchId } from "@/domain/models/matches/matchId";
import { ShoeId } from "@/domain/models/shoes/shoeId";

describe("save", () => {
  test("Can save a match.", async () => {
    const repository = new InMemoryMatchRepository();
    const expected = Match.create(new MatchId("matchId"), new ShoeId("shoeId"));

    await repository.saveAsync(expected);

    const actual = await repository.findAsync(expected.id);
    expect(actual.id).toBe(expected.id);
  });
});
