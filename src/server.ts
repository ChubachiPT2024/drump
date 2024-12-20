import express, { json } from "express";
import ViteExpress from "vite-express";
import { InMemoryMatchFactory } from "./infrastructure/inMemory/matches/inMemoryMatchFactory";
import { InMemoryMatchRepository } from "./infrastructure/inMemory/matches/inMemoryMatchRepository";
import { MatchApplicationService } from "./application/matches/matchApplicationService";
import { MatchRouterFactory } from "./router/matches/matchRouterFactory";
import { RoundService } from "./domain/services/roundService";
import { InMemoryDealerFactory } from "./infrastructure/inMemory/dealears/inMemoryDealearFactory";
import { InMemoryPlayerFactory } from "./infrastructure/inMemory/players/inMemoryPlayerFactory";

// TODO DI フレームワークの検討
const dealerFactory = new InMemoryDealerFactory();

const playerFactory = new InMemoryPlayerFactory();

const matchFactory = new InMemoryMatchFactory(dealerFactory, playerFactory);
const matchRepository = new InMemoryMatchRepository();
const roundService = new RoundService();
const matchApplicationService = new MatchApplicationService(
  matchFactory,
  matchRepository,
  roundService,
);
const matchRouterFactory = new MatchRouterFactory(matchApplicationService);

const app = express();

// POST された JSON を解析できるようにする
// 参考: https://expressjs.com/ja/guide/using-middleware.html#middleware.built-in
app.use(json());

app.use("/api/matches", matchRouterFactory.create());

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
