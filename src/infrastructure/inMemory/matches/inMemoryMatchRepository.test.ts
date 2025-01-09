import { describe, expect, test } from "vitest";
import { InMemoryMatchRepository } from "./inMemoryMatchRepository";
import { Match } from "@/domain/models/matches/match";
import { MatchId } from "@/domain/models/matches/matchId";
import { PlayerId } from "@/domain/models/players/playerId";
import { Player } from "@/domain/models/players/player";
import { UserId } from "@/domain/models/users/userId";
import { Dealer } from "@/domain/models/dealers/dealer";
import { DealerId } from "@/domain/models/dealers/dealerId";

describe("save", () => {
  test("Can save a match.", async () => {
    const repository = new InMemoryMatchRepository();
    const expected = Match.create(
      new MatchId("matchId"),
      Dealer.create(new DealerId("dealerId")),
      [Player.create(new PlayerId("playerId"), new UserId("userId"))],
    );

    await repository.saveAsync(expected);

    const actual = await repository.findAsync(expected.id);
    expect(actual.id).toBe(expected.id);
  });
});
