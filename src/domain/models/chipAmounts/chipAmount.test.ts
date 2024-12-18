import { describe, expect, test } from "vitest";
import { ChipAmount } from "./chipAmount";
import { ChipAmountNegativeError } from "./chipAmountNegativeError";

describe("plus", () => {
  test("It returns a new chip amount with plused value.", () => {
    const chipAmount = new ChipAmount(1);
    const otherChipAmount = new ChipAmount(2);

    const plusedChipAmount = chipAmount.plus(otherChipAmount);

    expect(plusedChipAmount.value).toBe(3);
  });
});

describe("can minus", () => {
  test("Can minus if the value is greater than the other's value.", () => {
    const chipAmount = new ChipAmount(2);
    const otherChipAmount = new ChipAmount(1);

    const canMinus = chipAmount.canMinus(otherChipAmount);

    expect(canMinus).toBe(true);
  });

  test("Can minus if the value is equal to the other's value.", () => {
    const chipAmount = new ChipAmount(2);
    const otherChipAmount = new ChipAmount(2);

    const canMinus = chipAmount.canMinus(otherChipAmount);

    expect(canMinus).toBe(true);
  });

  test("Cannot minus if the value is less than the other's value.", () => {
    const chipAmount = new ChipAmount(2);
    const otherChipAmount = new ChipAmount(3);

    const canMinus = chipAmount.canMinus(otherChipAmount);

    expect(canMinus).toBe(false);
  });
});

describe("minus", () => {
  test("It returns a new chip amount with minused value.", () => {
    const chipAmount = new ChipAmount(3);
    const otherChipAmount = new ChipAmount(1);

    const minusedChipAmount = chipAmount.minus(otherChipAmount);

    expect(minusedChipAmount.value).toBe(2);
  });

  test("It throws if the value is less than the other's value.", () => {
    const chipAmount = new ChipAmount(1);
    const otherChipAmount = new ChipAmount(3);

    try {
      chipAmount.minus(otherChipAmount);
    } catch (err) {
      expect(err).instanceOf(ChipAmountNegativeError);
    }
  });
});
