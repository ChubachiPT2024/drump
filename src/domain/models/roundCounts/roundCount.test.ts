import { describe, expect, test } from "vitest";
import { RoundCount } from "./roundCount";
import { RoundCountExceedsMaximumError } from "./roundCountExceedsMaximumError";

describe("increment", () => {
  test("Can increment if the round count is less than 10.", () => {
    const roundCount = RoundCount.ZERO;

    const newRoundCount = roundCount.increment();

    expect(newRoundCount.value).toBe(roundCount.value + 1);
  });

  test("Cannot increment if the round count is 10.", () => {
    let roundCount = RoundCount.ZERO;
    for (let i = 0; i < 10; i++) {
      roundCount = roundCount.increment();
    }

    try {
      roundCount.increment();
    } catch (err) {
      expect(err).toBeInstanceOf(RoundCountExceedsMaximumError);
    }
  });
});
