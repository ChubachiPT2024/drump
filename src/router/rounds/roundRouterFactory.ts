import { RoundCompleteCommand } from "@/application/rounds/Complete/roundCompleteCommand";
import { RoundCreateCommand } from "@/application/rounds/Create/roundCreateCommand";
import { RoundGetDealersHandCommand } from "@/application/rounds/GetDealersHand/roundGetDealersHandCommand";
import { RoundGetHandSignalOptionsCommand } from "@/application/rounds/GetHandSignalOptions/roundGetHandSignalOptionsCommand";
import { RoundGetPlayersHandCommand } from "@/application/rounds/GetPlayersHand/roundGetPlayersHandCommand";
import { RoundGetResultCommand } from "@/application/rounds/GetResult/roundGetResultCommand";
import { RoundGetUpCardCommand } from "@/application/rounds/GetUpCard/roundGetUpCardCommand";
import { RoundHitCommand } from "@/application/rounds/Hit/roundHitCommand";
import { RoundApplicationService } from "@/application/rounds/roundApplicationService";
import { RoundStandCommand } from "@/application/rounds/Stand/roundStandCommand";
import { RoundStartCommand } from "@/application/rounds/Start/roundStartCommand";
import { Router } from "express";

/**
 * ラウンドルータファクトリ
 */
export class RoundRouterFactory {
  /**
   * コンストラクタ
   *
   * @param roundApplicationService ラウンドアプリケーションサービス
   */
  public constructor(
    private readonly roundApplicationService: RoundApplicationService,
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
        const command = new RoundCreateCommand(req.body.shoeId);
        const result = await this.roundApplicationService.createAsync(command);

        res.status(201).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/start", async (req, res, next) => {
      try {
        const command = new RoundStartCommand(req.params.id);
        await this.roundApplicationService.startAsync(command);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/up-card", async (req, res, next) => {
      try {
        const command = new RoundGetUpCardCommand(req.params.id);
        const result =
          await this.roundApplicationService.getUpCardAsync(command);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/players-hand", async (req, res, next) => {
      try {
        const command = new RoundGetPlayersHandCommand(req.params.id);
        const result =
          await this.roundApplicationService.getPlayersHandAsync(command);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/hand-signal-options", async (req, res, next) => {
      try {
        const command = new RoundGetHandSignalOptionsCommand(req.params.id);
        const result =
          await this.roundApplicationService.getHandSignalOptionsAsync(command);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/hit", async (req, res, next) => {
      try {
        const command = new RoundHitCommand(req.params.id);
        await this.roundApplicationService.hitAsync(command);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/stand", async (req, res, next) => {
      try {
        const command = new RoundStandCommand(req.params.id);
        await this.roundApplicationService.standAsync(command);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });

    router.post("/:id/complete", async (req, res, next) => {
      try {
        const command = new RoundCompleteCommand(req.params.id);
        await this.roundApplicationService.completeAsync(command);

        res.status(204).send();
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/dealers-hand", async (req, res, next) => {
      try {
        const command = new RoundGetDealersHandCommand(req.params.id);
        const result =
          await this.roundApplicationService.getDealersHandAsync(command);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/result", async (req, res, next) => {
      try {
        const command = new RoundGetResultCommand(req.params.id);
        const result =
          await this.roundApplicationService.getResultAsync(command);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    return router;
  }
}
