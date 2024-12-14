import express, { json } from "express";
import ViteExpress from "vite-express";
import { SampleRouter } from "./router/sampleRouter";
import { InMemoryShoeFactory } from "./infrastructure/inMemory/shoes/inMemoryShoeFactory";
import { InMemoryShoeRepository } from "./infrastructure/inMemory/shoes/inMemoryShoeRepository";
import { CardsService } from "./domain/services/cardsService";
import { ShoeApplicationService } from "./application/shoes/shoeApplicationService";
import { ShoeRouterFactory } from "./router/shoes/shoeRouterFactory";
import { InMemoryMatchFactory } from "./infrastructure/inMemory/matches/inMemoryMatchFactory";
import { InMemoryMatchRepository } from "./infrastructure/inMemory/matches/inMemoryMatchRepository";
import { MatchApplicationService } from "./application/matches/matchApplicationService";
import { MatchRouterFactory } from "./router/matches/matchRouterFactory";

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

const matchFactory = new InMemoryMatchFactory();
const matchRepository = new InMemoryMatchRepository();
const matchApplicationService = new MatchApplicationService(
  matchFactory,
  matchRepository,
);
const matchRouterFactory = new MatchRouterFactory(matchApplicationService);

const app = express();

// POST された JSON を解析できるようにする
// 参考: https://expressjs.com/ja/guide/using-middleware.html#middleware.built-in
app.use(json());

app.use("/api/sample", SampleRouter.create());
app.use("/api/shoes", shoeRouterFactory.create());
app.use("/api/matches", matchRouterFactory.create());

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
