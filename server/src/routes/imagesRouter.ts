import express from "express";
import {
  createImageHandler,
  getImageWithIdHandler,
  updateImageDetails,
} from "../handlers/imagesHanler";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import { idParamsValidator } from "../validators/photoAlbumValidators";
import { validateBodyFields } from "../middlewares/validateBodyFields";
import { updateImageValidator } from "../validators/imageValidators";

const r = express.Router();
r.get("/:id", idParamsValidator(), validateBodyFields, getImageWithIdHandler);
r.use(isAdminMiddleware);
r.post("/", createImageHandler);
r.put(
  "/:id",
  idParamsValidator(),
  updateImageValidator(),
  validateBodyFields,
  updateImageDetails,
);

export { r as imagesRouter };
