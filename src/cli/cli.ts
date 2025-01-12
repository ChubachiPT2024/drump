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
import { MatchGetPlayersNamesCommand } from "@/application/matches/getPlayersNames/matchGetPlayersNamesCommand";
import { MatchGetHintCommand } from "@/application/matches/getHint/matchGetHintCommand";

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
const userIds = [];
for (const userName of ["Alice", "Bob"]) {
  const userCreateResult = await userApplicationService.createAsync(
    new UserCreateCommand(userName),
  );
  userIds.push(userCreateResult.id);
}

// 試合の作成
const matchCreateResult = await matchApplicationService.createAsync(
  new MatchCreateCommand(userIds),
);
const matchId = matchCreateResult.id;

// playerId => userName 変換の Map 作成
const matchGetPlayersNamesResult =
  await matchApplicationService.getPlayersNamesAsync(
    new MatchGetPlayersNamesCommand(matchId),
  );
const playerIdToNameMap = new Map(
  matchGetPlayersNamesResult.players.map((player) => [player.id, player.name]),
);

// 試合
while (true) {
  // ラウンドの開始
  await matchApplicationService.startRoundAsync(
    new MatchStartRoundCommand(matchId),
  );
  const matchStartRoundResultSummary =
    await matchApplicationService.getSummaryAsync(
      new MatchGetSummaryCommand(matchId),
    );

  console.log(`[Round ${matchStartRoundResultSummary.roundCount} start]`);

  // クレジットの表示とベット
  console.log("[Bet]");
  for (const [playerId, name] of playerIdToNameMap.entries()) {
    console.log(`[Bet of ${name}]`);
    console.log(
      `Credit: ${matchStartRoundResultSummary.players!.find((x) => x.id === playerId)!.credit}`,
    );
    const betAmount = await rl.question("Bet: ");
    console.log();
    await matchApplicationService.betAsync(
      new MatchBetCommand(matchId, playerId, Number(betAmount)),
    );
  }

  // アップカード表示
  const upCard = matchStartRoundResultSummary.dealer.upCard;
  console.log("[Dealer's hand]");
  console.log(`Up card: ${suitStrings.get(upCard!.suit)}${upCard!.rank}`);
  console.log("Hole Card: ?");
  console.log();

  for (const [playerId, name] of playerIdToNameMap.entries()) {
    console.log(`[Turn of ${name}]`);

    while (true) {
      // プレイヤーのハンド表示
      const matchSummary = await matchApplicationService.getSummaryAsync(
        new MatchGetSummaryCommand(matchId),
      );
      const playerSummary = matchSummary.players!.find(
        (x) => x.id === playerId,
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

      // ヒント表示
      const matchGetHintResult = await matchApplicationService.getHintAsync(
        new MatchGetHintCommand(matchId, playerId),
      );
      console.log("[Hint]");
      console.log(`Basic strategy: ${matchGetHintResult.basicStrategy}`);
      console.log();

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
    console.log(`[Result of ${playerIdToNameMap.get(player.id)}]`);
    console.log(`Outcome: ${player.result}`);
    console.log(`Credit: ${player.credit}`);
    console.log();
  }

  // 試合完了判定
  const matchAfterRoundSummary = await matchApplicationService.getSummaryAsync(
    new MatchGetSummaryCommand(matchId),
  );
  if (matchAfterRoundSummary.isCompleted) {
    break;
  }
}

// 試合結果を表示する
const matchResult = await matchApplicationService.getResultAsync(
  new MatchGetResultCommand(matchId),
);
console.log("[Match result]");
for (const player of matchResult.players) {
  console.log(`[Result of ${playerIdToNameMap.get(player.id)}]`);
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
