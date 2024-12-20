import { describe, expect, test } from "vitest";
import { InMemoryRoundRepository } from "./inMemoryRoundRepository";
import { Round } from "@/domain/models/rounds/round";
import { RoundId } from "@/domain/models/rounds/roundId";
import { DealerId } from "@/domain/models/dealers/dealerId";
import { PlayerId } from "@/domain/models/players/playerId";

describe("save", () => {
  test("Can save a round.", async () => {
    const repository = new InMemoryRoundRepository();
    const expected = new Round(
      new RoundId("roundId"),
      new DealerId("dealerId"),
      new PlayerId("playerId"),
    );

    await repository.saveAsync(expected);

    const actual = await repository.findAsync(expected.id);
    expect(actual.id).toBe(expected.id);
  });
});
