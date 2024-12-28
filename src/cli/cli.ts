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
const matchApplicationService = new MatchApplicationService(
  matchFactory,
  matchRepository,
);

// 試合の作成
const matchCreateResult = await matchApplicationService.createAsync(
  new MatchCreateCommand("userId"),
);
const matchId = matchCreateResult.id;

for (let i = 0; i < 10; i++) {
  // ラウンドの開始
  await matchApplicationService.startRoundAsync(
    new MatchStartRoundCommand(matchId),
  );
  const matchStartResultSummary = await matchApplicationService.getSummaryAsync(
    new MatchGetSummaryCommand(matchId),
  );

  console.log(`[Round ${matchStartResultSummary.roundCount} start]`);

  // クレジットの表示とベット
  console.log("[Bet]");
  console.log(`Credit: ${matchStartResultSummary.player.credit}`);
  const betAmount = await rl.question("Bet: ");
  console.log();
  await matchApplicationService.betAsync(
    new MatchBetCommand(matchId, Number(betAmount)),
  );

  // アップカード表示
  const upCard = matchStartResultSummary.dealer.upCard;
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
        await matchApplicationService.standAsync(
          new MatchStandCommand(matchId),
        );
        break;
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
  console.log(`Outcome: ${roundResult.player.result}`);
  console.log(`Credit: ${roundResult.player.credit}`);
  console.log();
}

exit();
