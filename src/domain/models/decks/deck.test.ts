import { describe, expect, test } from "vitest";
import { Deck } from "./deck";

describe("create and get cards", () => {
  test("A deck contains 52 cards.", () => {
    const deck = Deck.create();
    expect(deck.getCards().length).toBe(52);
  });
});
