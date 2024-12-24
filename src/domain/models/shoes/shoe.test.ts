import { describe, expect, test } from "vitest";
import { Shoe } from "./shoe";

describe("peek", () => {
  test("It returns a same card every time.", () => {
    // Arrange
    const shoe = Shoe.createFromDecks(1);

    // Act
    const first = shoe.peek();
    const second = shoe.peek();

    // Assert
    expect(first.equals(second)).toBe(true);
  });
});

describe("draw", () => {
  test("It creates a new shoe without the first card.", () => {
    // Arrange
    const shoe = Shoe.createFromDecks(1);

    // Act
    const newShoe = shoe.draw();

    // Assert
    expect(shoe.peek().equals(newShoe.peek())).toBe(false);
  });
});
