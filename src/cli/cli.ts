import { MatchApplicationService } from "@/application/matches/matchApplicationService";
import { MatchCreateCommand } from "@/application/matches/create/matchCreateCommand";
import { InMemoryMatchFactory } from "@/infrastructure/inMemory/matches/inMemoryMatchFactory";
import { InMemoryMatchRepository } from "@/infrastructure/inMemory/matches/inMemoryMatchRepository";
import { createInterface } from "node:readline/promises";
import { HandSignal } from "@/domain/models/handSignals/handSignal";
import { exit } from "node:process";
import { Suit } from "@/domain/models/suits/suit";
import { InMemoryDealerFactory } from "@/infrastructure/inMemory/dealears/inMemoryDealearFactory";
import { InMemoryPlayerFactory } from "@/infrastructure/inMemory/players/inMemoryPlayerFactory";
import { MatchStartRoundCommand } from "@/application/matches/startRound/matchStartCommand";
import { MatchGetSummaryCommand } from "@/application/matches/getSummary/matchGetSummaryCommand";
import { MatchHitCommand } from "@/application/matches/hit/matchHitCommand";
import { MatchStandCommand } from "@/application/matches/stand/matchStandCommand";
import { MatchCompleteRoundCommand } from "@/application/matches/completeRound/matchCompleteRoundCommand";
import { MatchGetRoundResultCommand } from "@/application/matches/getRoundResult/matchGetRoundResultCommand";
import { MatchBetCommand } from "@/application/matches/bet/matchBetCommand";
import { MatchGetResultCommand } from "@/application/matches/getResult/matchGetResultCommand";
import { InMemoryUserFactory } from "@/infrastructure/inMemory/users/inMemoryUserFactory";
import { InMemoryUserRepository } from "@/infrastructure/inMemory/users/inMemoryUserRepository";
import { UserApplicationService } from "@/application/users/userApplicationService";
import { UserCreateCommand } from "@/application/users/create/userCreateCommand";

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

const userFactory = new InMemoryUserFactory();
const userRepository = new InMemoryUserRepository();
const userApplicationService = new UserApplicationService(
  userFactory,
  userRepository,
);

const dealerFactory = new InMemoryDealerFactory();
const playerFactory = new InMemoryPlayerFactory();
const matchFactory = new InMemoryMatchFactory(dealerFactory, playerFactory);
const matchRepository = new InMemoryMatchRepository();
const matchApplicationService = new MatchApplicationService(
  matchFactory,
  matchRepository,
  userRepository,
);

// ユーザの作成
const userNames = ["Alice", "Bob"];
const userIdToUserNameMap = new Map<string, string>();
for (const userName of userNames) {
  const userCreateResult = await userApplicationService.createAsync(
    new UserCreateCommand(userName),
  );
  userIdToUserNameMap.set(userCreateResult.id, userName);
}

// 試合の作成
const matchCreateResult = await matchApplicationService.createAsync(
  new MatchCreateCommand([...userIdToUserNameMap.keys()]),
);
const matchId = matchCreateResult.id;

// TODO 適当な API を実装して処理を代替
// playerId => userName 変換の Map 作成
const matchCreateResultSummary = await matchApplicationService.getSummaryAsync(
  new MatchGetSummaryCommand(matchId),
);
const playerIdToUserNameMap = new Map(
  matchCreateResultSummary.players!.map((player) => [
    player.id!,
    userIdToUserNameMap.get(player.userId!)!,
  ]),
);

// 試合
for (let i = 0; i < 10; i++) {
  // ラウンドの開始
  await matchApplicationService.startRoundAsync(
    new MatchStartRoundCommand(matchId),
  );
  const matchStartResultSummary = await matchApplicationService.getSummaryAsync(
    new MatchGetSummaryCommand(matchId),
  );

  console.log(`[Round ${matchStartResultSummary.roundCount} start]`);

  // アップカード表示
  const upCard = matchStartResultSummary.dealer.upCard;
  console.log("[Dealer's hand]");
  console.log(`Up card: ${suitStrings.get(upCard!.suit)}${upCard!.rank}`);
  console.log("Hole Card: ?");
  console.log();

  for (const player of matchStartResultSummary.players!) {
    console.log(`[Turn of ${playerIdToUserNameMap.get(player.id!)}]`);

    // クレジットの表示とベット
    const playerId = player.id!;
    console.log("[Bet]");
    console.log(`Credit: ${player.credit}`);
    const betAmount = await rl.question("Bet: ");
    console.log();
    await matchApplicationService.betAsync(
      new MatchBetCommand(matchId, playerId, Number(betAmount)),
    );

    while (true) {
      // プレイヤーのハンド表示
      const matchSummary = await matchApplicationService.getSummaryAsync(
        new MatchGetSummaryCommand(matchId),
      );
      const playerSummary = matchSummary.players!.find(
        (x) => x.id === player.id,
      )!;

      const playersHand = playerSummary.hand!;
      console.log("[Player's hand]");
      console.log(
        `Cards: ${playersHand.cards.map((card) => `${suitStrings.get(card.suit)}${card.rank}`).join(" ")}`,
      );
      console.log(`Total: ${playersHand.total}`);
      console.log();

      if (playersHand.isResolved) {
        break;
      }

      // ハンドシグナルの選択肢表示
      const handSignals = playerSummary.handSignalOptions;

      console.log("[Hand signal options]");
      for (const [i, handSignal] of handSignals.entries()) {
        console.log(`${i}: ${handSignal}`);
      }
      console.log();

      // ハンドシグナルの選択
      const selectedHandSignal = await rl.question("Select hand signal: ");
      console.log();

      // ハンドシグナルを出す
      switch (handSignals[Number(selectedHandSignal)]) {
        case HandSignal.Hit:
          await matchApplicationService.hitAsync(
            new MatchHitCommand(matchId, playerId),
          );
          break;

        case HandSignal.Stand:
          await matchApplicationService.standAsync(
            new MatchStandCommand(matchId, playerId),
          );
          break;
      }
    }
  }

  // ラウンドを完了する
  await matchApplicationService.completeRoundAsync(
    new MatchCompleteRoundCommand(matchId),
  );

  // ラウンドの結果を表示する
  const roundResult = await matchApplicationService.getRoundResultAsync(
    new MatchGetRoundResultCommand(matchId),
  );
  const dealersHand = roundResult.dealersHand;

  console.log("[Dealer's hand]");
  console.log(
    `Cards: ${dealersHand.cards.map((card) => `${suitStrings.get(card.suit)}${card.rank}`).join(" ")}`,
  );
  console.log(`Total: ${dealersHand.total}`);
  console.log();

  console.log("[Round result]");
  for (const player of roundResult.players) {
    console.log(`[Result of ${playerIdToUserNameMap.get(player.id)}]`);
    console.log(`Outcome: ${player.result}`);
    console.log(`Credit: ${player.credit}`);
    console.log();
  }
}

// 試合結果を表示する
const matchResult = await matchApplicationService.getResultAsync(
  new MatchGetResultCommand(matchId),
);
console.log("[Match result]");
for (const player of matchResult.players) {
  console.log(`[Result of ${playerIdToUserNameMap.get(player.id)}]`);
  for (const [i, v] of player.creditHistories.entries()) {
    console.log(`Round ${i + 1}: ${v}`);
  }
  console.log(`Final credit: ${player.finalCredit}`);
  console.log(
    `Balance: ${Intl.NumberFormat(undefined, { signDisplay: "always", useGrouping: false }).format(player.balance)}`,
  );
  console.log();
}

exit();
