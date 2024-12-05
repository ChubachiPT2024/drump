import { InMemoryShoeFactory } from "@/infrastructure/inMemory/shoes/inMemoryShoeFactory";
import { InMemoryShoeRepository } from "@/infrastructure/inMemory/shoes/inMemoryShoeRepository";
import { describe, expect, test } from "vitest";
import { ShoeApplicationService } from "./shoeApplicationService";
import { ShoeId } from "@/domain/models/shoes/shoeId";

describe("create", () => {
  test("Can create a shoe", async () => {
    const shoeFactory = new InMemoryShoeFactory();
    const shoeRepository = new InMemoryShoeRepository();
    const service = new ShoeApplicationService(shoeFactory, shoeRepository);

    const result = await service.createAsync();

    const shoe = await shoeRepository.findAsync(new ShoeId(result.id));
    expect(shoe).toBeDefined();
  });
});
