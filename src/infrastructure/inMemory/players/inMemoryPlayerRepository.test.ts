import { describe, expect, test } from "vitest";
import { InMemoryPlayerRepository } from "./inMemoryPlayerRepository";
import { Player } from "@/domain/models/players/player";
import { PlayerId } from "@/domain/models/players/playerId";
import { UserId } from "@/domain/models/users/userId";

describe("save", () => {
  test("Can save a player.", async () => {
    const repository = new InMemoryPlayerRepository();
    const expected = Player.create(
      new PlayerId("playerId"),
      new UserId("userId"),
    );

    await repository.saveAsync(expected);

    const actual = await repository.findAsync(expected.id);
    expect(actual.id).toBe(expected.id);
  });
});
