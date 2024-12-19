import { describe, expect, test } from "vitest";
import { Dealer } from "@/domain/models/dealers/dealer";
import { DealerId } from "@/domain/models/dealers/dealerId";
import { InMemoryDealerRepository } from "./inMemoryDealerRepository";

describe("save", () => {
  test("Can save a dealer.", async () => {
    const repository = new InMemoryDealerRepository();
    const expected = Dealer.create(new DealerId("dealerId"));

    await repository.saveAsync(expected);

    const actual = await repository.findAsync(expected.id);
    expect(actual.id).toBe(expected.id);
  });
});
