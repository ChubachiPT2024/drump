import { MatchBetCommand } from "@/application/matches/bet/matchBetCommand";
import { MatchCompleteRoundCommand } from "@/application/matches/completeRound/matchCompleteRoundCommand";
import { MatchCreateCommand } from "@/application/matches/create/matchCreateCommand";
import { MatchGetHintCommand } from "@/application/matches/getHint/matchGetHintCommand";
import { MatchGetPlayersNamesCommand } from "@/application/matches/getPlayersNames/matchGetPlayersNamesCommand";
import { MatchGetResultCommand } from "@/application/matches/getResult/matchGetResultCommand";
import { MatchGetRoundResultCommand } from "@/application/matches/getRoundResult/matchGetRoundResultCommand";
import { MatchGetSummaryCommand } from "@/application/matches/getSummary/matchGetSummaryCommand";
import { MatchHitCommand } from "@/application/matches/hit/matchHitCommand";
import { MatchApplicationService } from "@/application/matches/matchApplicationService";
import { MatchStandCommand } from "@/application/matches/stand/matchStandCommand";
import { MatchStartRoundCommand } from "@/application/matches/startRound/matchStartCommand";
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
        const command = new MatchCreateCommand(req.body.userIds);
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

    router.post("/:id/players/:playerId/bet", async (req, res, next) => {
      try {
        const command = new MatchBetCommand(
          req.params.id,
          req.params.playerId,
          req.body.amount,
        );
        await this.matchApplicationService.betAsync(command);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/players/:playerId/hit", async (req, res, next) => {
      try {
        const command = new MatchHitCommand(req.params.id, req.params.playerId);
        await this.matchApplicationService.hitAsync(command);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/players/:playerId/stand", async (req, res, next) => {
      try {
        const command = new MatchStandCommand(
          req.params.id,
          req.params.playerId,
        );
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

    router.get("/:id/result", async (req, res, next) => {
      try {
        const command = new MatchGetResultCommand(req.params.id);
        const result =
          await this.matchApplicationService.getResultAsync(command);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/players-names", async (req, res, next) => {
      try {
        const command = new MatchGetPlayersNamesCommand(req.params.id);
        const result =
          await this.matchApplicationService.getPlayersNamesAsync(command);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/players/:playerId/hint", async (req, res, next) => {
      try {
        const command = new MatchGetHintCommand(
          req.params.id,
          req.params.playerId,
        );
        const result = await this.matchApplicationService.getHintAsync(command);

        res.status(200).json(result);
      } catch (err) {
        console.log(err);
        next(err);
      }
    });

    return router;
  }
}
