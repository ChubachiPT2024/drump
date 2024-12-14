import { RoundCreateCommand } from "@/application/rounds/Create/roundCreateCommand";
import { RoundGetHandSignalOptionsCommand } from "@/application/rounds/GetHandSignalOptions/roundGetHandSignalOptionsCommand";
import { RoundGetPlayersHandCommand } from "@/application/rounds/GetPlayersHand/roundGetPlayersHandCommand";
import { RoundGetUpCardCommand } from "@/application/rounds/GetUpCard/roundGetUpCardCommand";
import { RoundApplicationService } from "@/application/rounds/roundApplicationService";
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

    router.post("/start", async (req, res, next) => {
      try {
        const command = new RoundStartCommand(req.body.id);
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

    return router;
  }
}
