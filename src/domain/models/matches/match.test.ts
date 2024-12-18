import { describe, expect, test } from "vitest";
import { Match } from "./match";
import { MatchId } from "./matchId";
import { ShoeId } from "../shoes/shoeId";
import { RoundId } from "../rounds/roundId";

describe("add round", () => {
  test("Can add a round.", () => {
    const match = Match.create(new MatchId("matchId"), new ShoeId("shoeId"));
    const roundId = new RoundId("roundId");

    match.addRound(roundId);

    expect(match.getRoundIds().length).toBe(1);
    expect(match.getRoundIds()[0].value).toBe(roundId.value);
  });
});
