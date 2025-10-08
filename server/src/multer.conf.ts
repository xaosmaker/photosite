import multer from "multer";
import imagesTable from "./db/schema/images";
import { FieldAlreadyExistsError } from "./errors/fieldAlreadyExistsError";
import { db } from "./db/dbPool";
import { FILE_SIZE } from "./settings";

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

export const upload = multer({
  storage: storage,
  limits: { fileSize: Number(FILE_SIZE) * 1024 * 1024 },
});
