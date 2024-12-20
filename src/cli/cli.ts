import { MatchApplicationService } from "@/application/matches/matchApplicationService";
import { MatchCreateCommand } from "@/application/matches/Create/matchCreateCommand";
import { InMemoryMatchFactory } from "@/infrastructure/inMemory/matches/inMemoryMatchFactory";
import { InMemoryMatchRepository } from "@/infrastructure/inMemory/matches/inMemoryMatchRepository";
import { createInterface } from "node:readline/promises";
import { HandSignal } from "@/domain/models/handSignals/handSignal";
import { exit } from "node:process";
import { Suit } from "@/domain/models/suits/suit";
import { RoundService } from "@/domain/services/roundService";
import { InMemoryDealerFactory } from "@/infrastructure/inMemory/dealears/inMemoryDealearFactory";
import { InMemoryPlayerFactory } from "@/infrastructure/inMemory/players/inMemoryPlayerFactory";
import { MatchStartRoundCommand } from "@/application/matches/StartRound/matchStartCommand";
import { MatchGetSummaryCommand } from "@/application/matches/GetSummary/matchGetSummaryCommand";
import { MatchHitCommand } from "@/application/matches/Hit/matchHitCommand";
import { MatchStandCommand } from "@/application/matches/Stand/matchStandCommand";
import { MatchCompleteRoundCommand } from "@/application/matches/CompleteRound/matchCompleteRoundCommand";
import { MatchGetRoundResultCommand } from "@/application/matches/GetRoundResult/matchGetRoundResult";

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
const playerFactory = new InMemoryPlayerFactory();
const matchFactory = new InMemoryMatchFactory(dealerFactory, playerFactory);
const matchRepository = new InMemoryMatchRepository();
const roundService = new RoundService();
const matchApplicationService = new MatchApplicationService(
  matchFactory,
  matchRepository,
  roundService,
);

// 試合の作成
const matchCreateResult = await matchApplicationService.createAsync(
  new MatchCreateCommand("userId"),
);
const matchId = matchCreateResult.id;

// ラウンドの開始
await matchApplicationService.startRoundAsync(
  new MatchStartRoundCommand(matchId),
);

console.log("[Round start]");
console.log();

// アップカード表示
const upCard = (
  await matchApplicationService.getSummaryAsync(
    new MatchGetSummaryCommand(matchId),
  )
).dealer.upCard;
console.log("[Dealer's hand]");
console.log(`Up card: ${suitStrings.get(upCard!.suit)}${upCard!.rank}`);
console.log("Hole Card: ?");
console.log();

while (true) {
  // プレイヤーのハンド表示
  const matchSummary = await matchApplicationService.getSummaryAsync(
    new MatchGetSummaryCommand(matchId),
  );

  const playersHand = matchSummary.player.hand!;
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
  const handSignals = matchSummary.player.handSignalOptions;

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
      await matchApplicationService.hitAsync(new MatchHitCommand(matchId));
      break;

    case HandSignal.Stand:
      await matchApplicationService.standAsync(new MatchStandCommand(matchId));
      break;
  }
}

// ラウンドを完了する
await matchApplicationService.completeRoundAsync(
  new MatchCompleteRoundCommand(matchId),
);

// ディーラーのハンドを表示する
const dealersHand = (
  await matchApplicationService.getSummaryAsync(
    new MatchGetSummaryCommand(matchId),
  )
).dealer.hand!;

console.log("[Dealer's hand]");
console.log(
  `Cards: ${dealersHand.cards.map((card) => `${suitStrings.get(card.suit)}${card.rank}`).join(" ")}`,
);
console.log(`Total: ${dealersHand.total}`);
console.log();

// ラウンドの結果を表示する
const roundResult = await matchApplicationService.getRoundResultAsync(
  new MatchGetRoundResultCommand(matchId),
);
console.log("[Round result]");
console.log(roundResult.result);

exit();
