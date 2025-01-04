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

describe("find all", () => {
  test("It returns all the users.", async () => {
    const repository = new InMemoryUserRepository();
    const expected = [
      new User(new UserId("1"), new UserName("Alice")),
      new User(new UserId("2"), new UserName("Bob")),
    ];
    for (const user of expected) {
      await repository.saveAsync(user);
    }

    const actual = await repository.findAllAsync();

    expect(actual.length).toBe(expected.length);
  });
});
