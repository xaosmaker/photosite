import express from "express";
import {
  createPhotoAlbumHandler,
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
import multer from "multer";
import { FieldAlreadyExistsError } from "../errors/fieldAlreadyExistsError";
import { db } from "../db/dbPool";
import imagesTable from "../db/schema/images";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "/test");
  },
  filename: async function (_req, file, cb) {
    const images = await db
      .select({ filename: imagesTable.filename })
      .from(imagesTable);

    images.forEach((image) => {
      if (image.filename === file.originalname) {
        cb(new FieldAlreadyExistsError("file already exists"), file.filename);
        return;
      }
    });
    cb(null, file.originalname);
  },
  /* need to modifi the file here it checks if the files exist in the db
   * if exist throw error else continue
   * then validate the data
   * once a week we need a cron job to clear the unused files
   */
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
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

export { r as photoAlbumRouter };
