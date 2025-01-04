import express, { json } from "express";
import ViteExpress from "vite-express";
import { InMemoryMatchFactory } from "./infrastructure/inMemory/matches/inMemoryMatchFactory";
import { InMemoryMatchRepository } from "./infrastructure/inMemory/matches/inMemoryMatchRepository";
import { MatchApplicationService } from "./application/matches/matchApplicationService";
import { MatchRouterFactory } from "./router/matches/matchRouterFactory";
import { InMemoryDealerFactory } from "./infrastructure/inMemory/dealears/inMemoryDealearFactory";
import { InMemoryPlayerFactory } from "./infrastructure/inMemory/players/inMemoryPlayerFactory";
import { InMemoryUserFactory } from "./infrastructure/inMemory/users/inMemoryUserFactory";
import { InMemoryUserRepository } from "./infrastructure/inMemory/users/inMemoryUserRepository";
import { UserApplicationService } from "./application/users/userApplicationService";
import { UserRouterFactory } from "./router/users/userRouterFactory";

// TODO DI フレームワークの検討
const userFactory = new InMemoryUserFactory();
const userRepository = new InMemoryUserRepository();
const userApplicationService = new UserApplicationService(
  userFactory,
  userRepository,
);
const userRouterFactory = new UserRouterFactory(userApplicationService);

const dealerFactory = new InMemoryDealerFactory();

const playerFactory = new InMemoryPlayerFactory();

const matchFactory = new InMemoryMatchFactory(dealerFactory, playerFactory);
const matchRepository = new InMemoryMatchRepository();
const matchApplicationService = new MatchApplicationService(
  matchFactory,
  matchRepository,
  userRepository,
);
const matchRouterFactory = new MatchRouterFactory(matchApplicationService);

const app = express();

// POST された JSON を解析できるようにする
// 参考: https://expressjs.com/ja/guide/using-middleware.html#middleware.built-in
app.use(json());

app.use("/api/matches", matchRouterFactory.create());
app.use("/api/users", userRouterFactory.create());

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
