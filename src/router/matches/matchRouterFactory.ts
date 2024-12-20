import { MatchCreateCommand } from "@/application/matches/Create/matchCreateCommand";
import { MatchGetSummaryCommand } from "@/application/matches/GetSummary/matchGetSummaryCommand";
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

    router.post("/", async (req, res, next) => {
      try {
        const command = new MatchCreateCommand(req.body.playerId);
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

    return router;
  }
}
