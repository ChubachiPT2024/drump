import { ShoeApplicationService } from "@/application/shoes/shoeApplicationService";
import { Router } from "express";

/**
 * シュールータファクトリ
 */
export class ShoeRouterFactory {
  /**
   * コンストラクタ
   *
   * @param shoeApplicationService シューアプリケーションサービス
   */
  public constructor(
    private readonly shoeApplicationService: ShoeApplicationService,
  ) {}

  /**
   * ルータを生成する
   *
   * @returns ルータ
   */
  public create(): Router {
    const router = Router();

    router.post("/", async (_, res, next) => {
      try {
        const result = await this.shoeApplicationService.createAsync();

        res.status(201).json(result);
      } catch (err) {
        next(err);
      }
    });

    return router;
  }
}
