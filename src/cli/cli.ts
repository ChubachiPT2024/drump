import { MatchAddRoundCommand } from "@/application/matches/matchAddRoundCommand";
import { MatchApplicationService } from "@/application/matches/matchApplicationService";
import { MatchCreateCommand } from "@/application/matches/matchCreateCommand";
import { RoundApplicationService } from "@/application/rounds/roundApplicationService";
import { RoundCreateCommand } from "@/application/rounds/roundCreateCommand";
import { RoundStartCommand } from "@/application/rounds/roundStartCommand";
import { ShoeApplicationService } from "@/application/shoes/shoeApplicationService";
import { MatchId } from "@/domain/models/matches/matchId";
import { RoundId } from "@/domain/models/rounds/roundId";
import { ShoeId } from "@/domain/models/shoes/shoeId";
import { InMemoryMatchFactory } from "@/infrastructure/inMemory/matches/inMemoryMatchFactory";
import { InMemoryMatchRepository } from "@/infrastructure/inMemory/matches/inMemoryMatchRepository";
import { InMemoryRoundFactory } from "@/infrastructure/inMemory/rounds/inMemoryRoundFactory";
import { InMemoryRoundRepository } from "@/infrastructure/inMemory/rounds/inMemoryRoundRepository";
import { InMemoryShoeFactory } from "@/infrastructure/inMemory/shoes/inMemoryShoeFactory";
import { InMemoryShoeRepository } from "@/infrastructure/inMemory/shoes/inMemoryShoeRepository";

const shoeFactory = new InMemoryShoeFactory();
const shoeRepository = new InMemoryShoeRepository();
const shoeApplicationService = new ShoeApplicationService(
  shoeFactory,
  shoeRepository,
);

const matchFactory = new InMemoryMatchFactory();
const matchRepository = new InMemoryMatchRepository();
const matchApplicationService = new MatchApplicationService(
  matchFactory,
  matchRepository,
);

const roundFactory = new InMemoryRoundFactory();
const roundRepository = new InMemoryRoundRepository();
const roundApplicationService = new RoundApplicationService(
  roundFactory,
  roundRepository,
  shoeRepository,
);

// シューの作成
const shoeCreateResult = await shoeApplicationService.createAsync();

// 試合の作成
const matchCreateResult = await matchApplicationService.createAsync(
  new MatchCreateCommand(shoeCreateResult.id),
);

// ラウンドの作成
const roundCreateResult = await roundApplicationService.createAsync(
  new RoundCreateCommand(shoeCreateResult.id),
);

// 試合へのラウンド追加
await matchApplicationService.addRoundAsync(
  new MatchAddRoundCommand(matchCreateResult.id, roundCreateResult.id),
);

// ラウンドの開始
await roundApplicationService.startAsync(
  new RoundStartCommand(roundCreateResult.id),
);

console.log(await shoeRepository.findAsync(new ShoeId(shoeCreateResult.id)));
console.log(await matchRepository.findAsync(new MatchId(matchCreateResult.id)));
console.log(await roundRepository.findAsync(new RoundId(roundCreateResult.id)));
