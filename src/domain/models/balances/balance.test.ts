import { describe, expect, test } from "vitest";
import { ChipAmount } from "../chipAmounts/chipAmount";
import { Balance } from "./balance";

describe("create", () => {
  test("Can create a new instance with a positive balance.", () => {
    const before = new ChipAmount(1);
    const after = new ChipAmount(2);

    const balance = Balance.create(before, after);

    expect(balance.value).toBe(1);
  });

  test("Can create a new instance with a zero balance.", () => {
    const before = new ChipAmount(1);
    const after = new ChipAmount(1);

    const balance = Balance.create(before, after);

    expect(balance.value).toBe(0);
  });

  test("Can create a new instance with a negative balance.", () => {
    const before = new ChipAmount(2);
    const after = new ChipAmount(1);

    const balance = Balance.create(before, after);

    expect(balance.value).toBe(-1);
  });
});
