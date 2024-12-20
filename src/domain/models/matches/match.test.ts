import { describe, expect, test } from "vitest";
import { Match } from "./match";
import { MatchId } from "./matchId";
import { RoundId } from "../rounds/roundId";
import { PlayerId } from "../players/playerId";
import { Player } from "../players/player";
import { UserId } from "../users/userId";

describe("add round", () => {
  test("Can add a round.", () => {
    const match = Match.create(
      new MatchId("matchId"),
      Player.create(new PlayerId("playerId"), new UserId("userId")),
    );
    const roundId = new RoundId("roundId");

    match.addRound(roundId);

    expect(match.getRoundIds().length).toBe(1);
    expect(match.getRoundIds()[0].value).toBe(roundId.value);
  });
});
