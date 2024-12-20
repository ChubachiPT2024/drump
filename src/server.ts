import express, { json } from "express";
import ViteExpress from "vite-express";
import { InMemoryShoeFactory } from "./infrastructure/inMemory/shoes/inMemoryShoeFactory";
import { InMemoryShoeRepository } from "./infrastructure/inMemory/shoes/inMemoryShoeRepository";
import { CardsService } from "./domain/services/cardsService";
import { ShoeApplicationService } from "./application/shoes/shoeApplicationService";
import { ShoeRouterFactory } from "./router/shoes/shoeRouterFactory";
import { InMemoryMatchFactory } from "./infrastructure/inMemory/matches/inMemoryMatchFactory";
import { InMemoryMatchRepository } from "./infrastructure/inMemory/matches/inMemoryMatchRepository";
import { MatchApplicationService } from "./application/matches/matchApplicationService";
import { MatchRouterFactory } from "./router/matches/matchRouterFactory";
import { InMemoryRoundFactory } from "./infrastructure/inMemory/rounds/inMemoryRoundFactory";
import { InMemoryRoundRepository } from "./infrastructure/inMemory/rounds/inMemoryRoundRepository";
import { RoundApplicationService } from "./application/rounds/roundApplicationService";
import { RoundRouterFactory } from "./router/rounds/roundRouterFactory";
import { RoundService } from "./domain/services/roundService";
import { InMemoryDealerFactory } from "./infrastructure/inMemory/dealears/inMemoryDealearFactory";
import { InMemoryDealerRepository } from "./infrastructure/inMemory/dealears/inMemoryDealerRepository";
import { InMemoryPlayerFactory } from "./infrastructure/inMemory/players/inMemoryPlayerFactory";
import { InMemoryPlayerRepository } from "./infrastructure/inMemory/players/inMemoryPlayerRepository";
import { PlayerApplicationService } from "./application/players/playerApplicationService";
import { PlayerRouterFactory } from "./router/players/playerRouterFactory";

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

const dealerFactory = new InMemoryDealerFactory();
const dealerRepository = new InMemoryDealerRepository();

const playerFactory = new InMemoryPlayerFactory();
const playerRepository = new InMemoryPlayerRepository();
const playerApplicationService = new PlayerApplicationService(
  playerFactory,
  playerRepository,
);
const playerRouterFactory = new PlayerRouterFactory(playerApplicationService);

const matchFactory = new InMemoryMatchFactory(playerFactory);
const matchRepository = new InMemoryMatchRepository();
const matchApplicationService = new MatchApplicationService(
  matchFactory,
  matchRepository,
);
const matchRouterFactory = new MatchRouterFactory(matchApplicationService);

const roundFactory = new InMemoryRoundFactory();
const roundRepository = new InMemoryRoundRepository();
const roundService = new RoundService();
const roundApplicationService = new RoundApplicationService(
  roundFactory,
  dealerFactory,
  roundRepository,
  shoeRepository,
  dealerRepository,
  playerRepository,
  roundService,
);
const roundRouterFactory = new RoundRouterFactory(roundApplicationService);

const app = express();

// POST された JSON を解析できるようにする
// 参考: https://expressjs.com/ja/guide/using-middleware.html#middleware.built-in
app.use(json());

app.use("/api/shoes", shoeRouterFactory.create());
app.use("/api/matches", matchRouterFactory.create());
app.use("/api/rounds", roundRouterFactory.create());
app.use("/api/players", playerRouterFactory.create());

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
