import express from "express";
import {
  createImageHandler,
  getImageWithIdHandler,
  updateImageDetails,
} from "../handlers/imagesHanler";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import { idParamsValidator } from "../validators/photoAlbumValidators";
import { validateBodyFields } from "../middlewares/validateBodyFields";
import {
  postImageValidator,
  updateImageValidator,
} from "../validators/imageValidators";
import { upload } from "../multer.conf";

const r = express.Router();
r.get("/:id", idParamsValidator(), validateBodyFields, getImageWithIdHandler);
r.use(isAdminMiddleware);
r.post(
  "/",
  upload.array("images"),
  postImageValidator(),
  validateBodyFields,
  createImageHandler,
);
r.put(
  "/:id",
  idParamsValidator(),
  updateImageValidator(),
  validateBodyFields,
  updateImageDetails,
);

export { r as imagesRouter };
