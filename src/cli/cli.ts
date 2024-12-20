import { MatchAddRoundCommand } from "@/application/matches/AddRound/matchAddRoundCommand";
import { MatchApplicationService } from "@/application/matches/matchApplicationService";
import { MatchCreateCommand } from "@/application/matches/Create/matchCreateCommand";
import { RoundApplicationService } from "@/application/rounds/roundApplicationService";
import { RoundCreateCommand } from "@/application/rounds/Create/roundCreateCommand";
import { RoundStartCommand } from "@/application/rounds/Start/roundStartCommand";
import { InMemoryMatchFactory } from "@/infrastructure/inMemory/matches/inMemoryMatchFactory";
import { InMemoryMatchRepository } from "@/infrastructure/inMemory/matches/inMemoryMatchRepository";
import { InMemoryRoundFactory } from "@/infrastructure/inMemory/rounds/inMemoryRoundFactory";
import { InMemoryRoundRepository } from "@/infrastructure/inMemory/rounds/inMemoryRoundRepository";
import { createInterface } from "node:readline/promises";
import { HandSignal } from "@/domain/models/handSignals/handSignal";
import { RoundHitCommand } from "@/application/rounds/Hit/roundHitCommand";
import { RoundStandCommand } from "@/application/rounds/Stand/roundStandCommand";
import { RoundGetUpCardCommand } from "@/application/rounds/GetUpCard/roundGetUpCardCommand";
import { RoundCompleteCommand } from "@/application/rounds/Complete/roundCompleteCommand";
import { RoundGetDealersHandCommand } from "@/application/rounds/GetDealersHand/roundGetDealersHandCommand";
import { RoundGetResultCommand } from "@/application/rounds/GetResult/roundGetResultCommand";
import { exit } from "node:process";
import { Suit } from "@/domain/models/suits/suit";
import { RoundService } from "@/domain/services/roundService";
import { InMemoryDealerFactory } from "@/infrastructure/inMemory/dealears/inMemoryDealearFactory";
import { InMemoryDealerRepository } from "@/infrastructure/inMemory/dealears/inMemoryDealerRepository";
import { InMemoryPlayerFactory } from "@/infrastructure/inMemory/players/inMemoryPlayerFactory";
import { InMemoryPlayerRepository } from "@/infrastructure/inMemory/players/inMemoryPlayerRepository";
import { PlayerApplicationService } from "@/application/players/playerApplicationService";
import { PlayerCreateCommand } from "@/application/players/Create/playerCreateCommand";
import { PlayerGetHandCommand } from "@/application/players/GetHand/playerGetHandCommand";
import { PlayerGetHandSignalOptionsCommand } from "@/application/players/GetHandSignalOptions/playerGetHandSignalOptionsCommand";

const suitStrings = new Map<Suit, string>([
  [Suit.Spade, "♠"],
  [Suit.Heart, "♥"],
  [Suit.Diamond, "♦"],
  [Suit.Club, "♣"],
]);

// ユーザ入力読み取り用インターフェース
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dealerFactory = new InMemoryDealerFactory();
const dealerRepository = new InMemoryDealerRepository();

const playerFactory = new InMemoryPlayerFactory();
const playerRepository = new InMemoryPlayerRepository();
const playerApplicationService = new PlayerApplicationService(
  playerFactory,
  playerRepository,
);

const matchFactory = new InMemoryMatchFactory(playerFactory);
const matchRepository = new InMemoryMatchRepository();
const matchApplicationService = new MatchApplicationService(
  matchFactory,
  matchRepository,
);

const roundFactory = new InMemoryRoundFactory();
const roundRepository = new InMemoryRoundRepository();
const roundService = new RoundService();
const roundApplicationService = new RoundApplicationService(
  roundFactory,
  dealerFactory,
  roundRepository,
  dealerRepository,
  playerRepository,
  roundService,
);

// プレイヤーの作成
const playerCreateResult = await playerApplicationService.createAsync(
  new PlayerCreateCommand("userId"),
);
const playerId = playerCreateResult.id;

// 試合の作成
const matchCreateResult = await matchApplicationService.createAsync(
  new MatchCreateCommand(playerId),
);
const matchId = matchCreateResult.id;

// ラウンドの作成
const roundCreateResult = await roundApplicationService.createAsync(
  new RoundCreateCommand(playerId),
);
const roundId = roundCreateResult.id;

// 試合へのラウンド追加
await matchApplicationService.addRoundAsync(
  new MatchAddRoundCommand(matchId, roundId),
);

// ラウンドの開始
// await roundApplicationService.startAsync(new RoundStartCommand(roundId));

// console.log("[Round start]");
// console.log();

// // アップカード表示
// const upCard = await roundApplicationService.getUpCardAsync(
//   new RoundGetUpCardCommand(roundId),
// );
// console.log("[Dealer's hand]");
// console.log(`Up card: ${suitStrings.get(upCard.suit)}${upCard.rank}`);
// console.log("Hole Card: ?");
// console.log();

// while (true) {
//   // プレイヤーのハンド表示
//   const playersHand = await playerApplicationService.getHandAsync(
//     new PlayerGetHandCommand(playerId),
//   );

//   console.log("[Player's hand]");
//   console.log(
//     `Cards: ${playersHand.cards.map((card) => `${suitStrings.get(card.suit)}${card.rank}`).join(" ")}`,
//   );
//   console.log(`Total: ${playersHand.total}`);
//   console.log();

//   if (playersHand.isResolved) {
//     break;
//   }

//   // ハンドシグナルの選択肢表示
//   const playerGetHandSignalOptionsResult =
//     await playerApplicationService.getHandSignalOptionsAsync(
//       new PlayerGetHandSignalOptionsCommand(playerId),
//     );
//   const handSignals = playerGetHandSignalOptionsResult.handSignals;

//   console.log("[Hand signal options]");
//   for (const [i, handSignal] of handSignals.entries()) {
//     console.log(`${i}: ${handSignal}`);
//   }
//   console.log();

//   // ハンドシグナルの選択
//   const selectedHandSignal = await rl.question("Select hand signal: ");
//   console.log();

//   // ハンドシグナルを出す
//   switch (handSignals[Number(selectedHandSignal)]) {
//     case HandSignal.Hit:
//       await roundApplicationService.hitAsync(new RoundHitCommand(roundId));
//       break;

//     case HandSignal.Stand:
//       await roundApplicationService.standAsync(new RoundStandCommand(roundId));
//       break;
//   }
// }

// // ラウンドを完了する
// await roundApplicationService.completeAsync(new RoundCompleteCommand(roundId));

// // ディーラーのハンドを表示する
// const dealersHand = await roundApplicationService.getDealersHandAsync(
//   new RoundGetDealersHandCommand(roundId),
// );
// console.log("[Dealer's hand]");
// console.log(
//   `Cards: ${dealersHand.cards.map((card) => `${suitStrings.get(card.suit)}${card.rank}`).join(" ")}`,
// );
// console.log(`Total: ${dealersHand.total}`);
// console.log();

// // ラウンドの結果を表示する
// const roundResult = await roundApplicationService.getResultAsync(
//   new RoundGetResultCommand(roundId),
// );
// console.log("[Round result]");
// console.log(roundResult.result);

exit();
