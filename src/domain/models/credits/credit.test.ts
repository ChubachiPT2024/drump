import { describe, expect, test } from "vitest";
import { Credit } from "./credit";
import { ChipAmount } from "../chipAmounts/chipAmount";
import { CreditCannotWithdrawError } from "./creditCannotWithdrawError";

describe("deposit", () => {
  test("It returns a new credit with plused chip amount.", () => {
    const credit = new Credit(new ChipAmount(1));

    const newCredit = credit.deposit(new ChipAmount(2));

    expect(newCredit.chipAmount.value).toBe(3);
  });
});

describe("can withdraw", () => {
  test("Can withdraw if the chip amount is greater than the withdrawing chip amount.", () => {
    const credit = new Credit(new ChipAmount(2));
    const withdrawChipAmount = new ChipAmount(1);

    const canWithdraw = credit.canWithdraw(withdrawChipAmount);

    expect(canWithdraw).toBe(true);
  });

  test("Can withdraw if the chip amount is equal to the withdrawing chip amount.", () => {
    const credit = new Credit(new ChipAmount(2));
    const withdrawChipAmount = new ChipAmount(2);

    const canWithdraw = credit.canWithdraw(withdrawChipAmount);

    expect(canWithdraw).toBe(true);
  });

  test("Cannot withdraw if the chip amount is less than the withdrawing chip amount.", () => {
    const credit = new Credit(new ChipAmount(1));
    const withdrawChipAmount = new ChipAmount(2);

    const canWithdraw = credit.canWithdraw(withdrawChipAmount);

    expect(canWithdraw).toBe(false);
  });
});

describe("withdraw", () => {
  test("It returns a new credit with minused chip amount.", () => {
    const credit = new Credit(new ChipAmount(3));
    const withdrawChipAmount = new ChipAmount(1);

    const newCredit = credit.withdraw(withdrawChipAmount);

    expect(newCredit.chipAmount.value).toBe(2);
  });

  test("It throws if the chip amount is less than the withdrawing chip amount.", () => {
    const credit = new Credit(new ChipAmount(1));
    const withdrawChipAmount = new ChipAmount(3);

    try {
      credit.withdraw(withdrawChipAmount);
    } catch (err) {
      expect(err).instanceOf(CreditCannotWithdrawError);
    }
  });
});
