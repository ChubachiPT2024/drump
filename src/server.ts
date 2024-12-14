import express from "express";
import ViteExpress from "vite-express";
import { SampleRouter } from "./router/sampleRouter";
import { InMemoryShoeFactory } from "./infrastructure/inMemory/shoes/inMemoryShoeFactory";
import { InMemoryShoeRepository } from "./infrastructure/inMemory/shoes/inMemoryShoeRepository";
import { CardsService } from "./domain/services/cardsService";
import { ShoeApplicationService } from "./application/shoes/shoeApplicationService";
import { ShoeRouterFactory } from "./router/shoes/shoeRouterFactory";

// TODO DI フレームワークの検討
const shoeFactory = new InMemoryShoeFactory();
const shoeRepository = new InMemoryShoeRepository();
const cardsService = new CardsService();
const shoeApplicationService = new ShoeApplicationService(
  shoeFactory,
  shoeRepository,
  cardsService,
);
const shoeRouterFactory = new ShoeRouterFactory(shoeApplicationService);

const app = express();

app.use("/api/sample", SampleRouter.create());
app.use("/api/shoes", shoeRouterFactory.create());

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
