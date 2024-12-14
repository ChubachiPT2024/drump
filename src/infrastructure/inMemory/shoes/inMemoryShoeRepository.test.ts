import { describe, expect, test } from "vitest";
import { InMemoryShoeRepository } from "./inMemoryShoeRepository";
import { Shoe } from "@/domain/models/shoes/shoe";
import { Card } from "@/domain/models/cards/card";
import { Rank } from "@/domain/models/ranks/rank";
import { Suit } from "@/domain/models/suits/suit";
import { ShoeId } from "@/domain/models/shoes/shoeId";

describe("save", () => {
  test("Can save a shoe.", async () => {
    const repository = new InMemoryShoeRepository();
    const expected = new Shoe(new ShoeId("id"), [
      new Card(Rank.Ace, Suit.Spade),
    ]);

    await repository.saveAsync(expected);

    const actual = await repository.findAsync(expected.id);
    expect(actual.id).toBe(expected.id);
    expect(actual.peek()).toBe(expected.peek());
  });
});
