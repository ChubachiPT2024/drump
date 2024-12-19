import { PlayerCreateCommand } from "@/application/players/Create/playerCreateCommand";
import { PlayerGetHandCommand } from "@/application/players/GetHand/playerGetHandCommand";
import { PlayerGetHandSignalOptionsCommand } from "@/application/players/GetHandSignalOptions/playerGetHandSignalOptionsCommand";
import { PlayerApplicationService } from "@/application/players/playerApplicationService";
import { Router } from "express";

/**
 * プレイヤールータファクトリ
 */
export class PlayerRouterFactory {
  /**
   * コンストラクタ
   *
   * @param playerApplicationService プレイヤーアプリケーションサービス
   */
  public constructor(
    private readonly playerApplicationService: PlayerApplicationService,
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
        const command = new PlayerCreateCommand(req.body.userId);
        const result = await this.playerApplicationService.createAsync(command);

        res.status(201).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/hand", async (req, res, next) => {
      try {
        const command = new PlayerGetHandCommand(req.params.id);
        const result =
          await this.playerApplicationService.getHandAsync(command);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.get("/:id/hand-signal-options", async (req, res, next) => {
      try {
        const command = new PlayerGetHandSignalOptionsCommand(req.params.id);
        const result =
          await this.playerApplicationService.getHandSignalOptionsAsync(
            command,
          );

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    return router;
  }
}
