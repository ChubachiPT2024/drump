import express from "express";
import ViteExpress from "vite-express";
import { SampleRouter } from "./router/sampleRouter";

const app = express();

app.use("/api/sample", SampleRouter.create());

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
