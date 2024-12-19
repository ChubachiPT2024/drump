import { describe, expect, test } from "vitest";
import { InMemoryRoundRepository } from "./inMemoryRoundRepository";
import { Round } from "@/domain/models/rounds/round";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { RoundId } from "@/domain/models/rounds/roundId";
import { DealerId } from "@/domain/models/dealers/dealerId";

describe("save", () => {
  test("Can save a round.", async () => {
    const repository = new InMemoryRoundRepository();
    const expected = Round.create(
      new RoundId("roundId"),
      new ShoeId("shoeId"),
      new DealerId("dealerId"),
    );

    await repository.saveAsync(expected);

    const actual = await repository.findAsync(expected.id);
    expect(actual.id).toBe(expected.id);
  });
});
