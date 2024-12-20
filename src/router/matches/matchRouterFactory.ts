import { MatchCompleteRoundCommand } from "@/application/matches/CompleteRound/matchCompleteRoundCommand";
import { MatchCreateCommand } from "@/application/matches/Create/matchCreateCommand";
import { MatchGetRoundResultCommand } from "@/application/matches/GetRoundResult/matchGetRoundResult";
import { MatchGetSummaryCommand } from "@/application/matches/GetSummary/matchGetSummaryCommand";
import { MatchHitCommand } from "@/application/matches/Hit/matchHitCommand";
import { MatchApplicationService } from "@/application/matches/matchApplicationService";
import { MatchStandCommand } from "@/application/matches/Stand/matchStandCommand";
import { MatchStartRoundCommand } from "@/application/matches/StartRound/matchStartCommand";
import { Router } from "express";

/**
 * 試合ルータファクトリ
 */
export class MatchRouterFactory {
  /**
   * コンストラクタ
   *
   * @param matchApplicationService 試合アプリケーションサービス
   */
  public constructor(
    private readonly matchApplicationService: MatchApplicationService,
  ) {}

  /**
   * ルータを生成する
   *
   * @returns ルータ
   */
  public create(): Router {
    const router = Router();

    router.post("/", async (req, res, next) => {
      try {
        const command = new MatchCreateCommand(req.body.userId);
        const result = await this.matchApplicationService.createAsync(command);

        res.status(201).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/summary", async (req, res, next) => {
      try {
        const command = new MatchGetSummaryCommand(req.params.id);
        const result =
          await this.matchApplicationService.getSummaryAsync(command);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/start-round", async (req, res, next) => {
      try {
        const command = new MatchStartRoundCommand(req.params.id);
        await this.matchApplicationService.startRoundAsync(command);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/hit", async (req, res, next) => {
      try {
        const command = new MatchHitCommand(req.params.id);
        await this.matchApplicationService.hitAsync(command);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/stand", async (req, res, next) => {
      try {
        const command = new MatchStandCommand(req.params.id);
        await this.matchApplicationService.standAsync(command);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/complete-round", async (req, res, next) => {
      try {
        const command = new MatchCompleteRoundCommand(req.params.id);
        await this.matchApplicationService.completeRoundAsync(command);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/round-result", async (req, res, next) => {
      try {
        const command = new MatchGetRoundResultCommand(req.params.id);
        const result =
          await this.matchApplicationService.getRoundResultAsync(command);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    return router;
  }
}