import { MatchCreateCommand } from "@/application/matches/Create/matchCreateCommand";
import { MatchApplicationService } from "@/application/matches/matchApplicationService";
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

    router.post("/", async (req, res) => {
      const command = new MatchCreateCommand(req.body.shoeId);
      const result = await this.matchApplicationService.createAsync(command);

      res.status(201).json(result);
    });

    return router;
  }
}
