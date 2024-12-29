import { UserCreateCommand } from "@/application/users/create/userCreateCommand";
import { UserApplicationService } from "@/application/users/userApplicationService";
import { Router } from "express";

/**
 * ユーザルータファクトリ
 */
export class UserRouterFactory {
  /**
   * コンストラクタ
   *
   * @param userApplicationService ユーザアプリケーションサービス
   */
  public constructor(
    private readonly userApplicationService: UserApplicationService,
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
        const command = new UserCreateCommand(req.body.name);
        const result = await this.userApplicationService.createAsync(command);

        res.status(201).json(result);
      } catch (err) {
        next(err);
      }
    });

    router.get("/all", async (_, res, next) => {
      try {
        const result = await this.userApplicationService.getAllAsync();

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });

    return router;
  }
}
