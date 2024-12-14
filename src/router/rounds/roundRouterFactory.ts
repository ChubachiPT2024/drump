import { RoundCreateCommand } from "@/application/rounds/Create/roundCreateCommand";
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

    return router;
  }
}
