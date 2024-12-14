import { Router } from "express";

/**
 * サンプルルータ
 */
export class SampleRouter {
  /**
   * ルータを生成する
   *
   * @returns ルータ
   */
  public static create(): Router {
    const router = Router();

    router.get("/", (_, res) => {
      res.status(200).json({ message: "Hello!" });
    });

    router.get("/echo/:message", (req, res) => {
      console.log(req);
      res.status(200).json({ message: req.params.message });
    });

    router.get("/error", (_) => {
      throw new Error();
    });

    return router;
  }
}
