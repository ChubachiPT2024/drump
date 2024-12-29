import { describe, expect, test } from "vitest";
import { UserId } from "@/domain/models/users/userId";
import { InMemoryUserRepository } from "./inMemoryUserRepository";
import { UserName } from "@/domain/models/users/userName";
import { User } from "@/domain/models/users/user";

describe("save", () => {
  test("Can save a user.", async () => {
    const repository = new InMemoryUserRepository();
    const expected = new User(new UserId("userId"), new UserName("userName"));

    await repository.saveAsync(expected);

    const actual = await repository.findAsync(expected.id);
    expect(actual.id).toBe(expected.id);
  });
});
