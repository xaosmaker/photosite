import express from "express";
import {
  createPhotoAlbumHandler,
  deletePhotoAlbumHandler,
  getAllPhotoAlbumsHandler,
  getPhotoAlbumsWithIdHandler,
  updatePhotoAlbumHandler,
} from "../handlers/photoAlbumHandlers";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import {
  createPhotoAlbumValidators,
  idParamsValidator,
} from "../validators/photoAlbumValidators";
import { validateBodyFields } from "../middlewares/validateBodyFields";
import { upload } from "../multer.conf";

const r = express.Router();

r.get("/", getAllPhotoAlbumsHandler);
r.get(
  "/:id",
  idParamsValidator(),
  validateBodyFields,
  getPhotoAlbumsWithIdHandler,
);
r.use(isAdminMiddleware);
r.post(
  "/",
  upload.array("images"),
  createPhotoAlbumValidators(),
  validateBodyFields,
  createPhotoAlbumHandler,
);
r.put(
  "/:id",
  createPhotoAlbumValidators(),
  idParamsValidator(),
  validateBodyFields,
  updatePhotoAlbumHandler,
);
r.delete(
  "/:id",
  idParamsValidator(),
  validateBodyFields,
  deletePhotoAlbumHandler,
);

export { r as photoAlbumRouter };
