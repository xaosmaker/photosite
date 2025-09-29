import express from "express";
import { createImageHandler } from "../handlers/imagesHanler";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const r = express.Router();
r.use(isAdminMiddleware);
r.post("/", createImageHandler);

export { r as imagesRouter };
