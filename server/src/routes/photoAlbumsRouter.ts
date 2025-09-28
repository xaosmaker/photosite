import express from "express";
import { createPhotoAlbumHandler } from "../handlers/photoAlbumHandlers";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import { createPhotoAlbumValidators } from "../validators/photoAlbumValidators";
import { validateBodyFields } from "../middlewares/validateBodyFields";

const r = express.Router();

r.use(isAdminMiddleware);
r.post(
  "/",
  createPhotoAlbumValidators(),
  validateBodyFields,
  createPhotoAlbumHandler,
);

export { r as photoAlbumRouter };
