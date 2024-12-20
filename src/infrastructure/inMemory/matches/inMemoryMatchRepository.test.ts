import { describe, expect, test } from "vitest";
import { InMemoryMatchRepository } from "./inMemoryMatchRepository";
import { Match } from "@/domain/models/matches/match";
import { MatchId } from "@/domain/models/matches/matchId";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { PlayerId } from "@/domain/models/players/playerId";
import { Player } from "@/domain/models/players/player";
import { UserId } from "@/domain/models/users/userId";

describe("save", () => {
  test("Can save a match.", async () => {
    const repository = new InMemoryMatchRepository();
    const expected = Match.create(
      new MatchId("matchId"),
      new ShoeId("shoeId"),
      Player.create(new PlayerId("playerId"), new UserId("userId")),
    );

    await repository.saveAsync(expected);

    const actual = await repository.findAsync(expected.id);
    expect(actual.id).toBe(expected.id);
  });
});
