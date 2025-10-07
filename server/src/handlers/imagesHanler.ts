import { NextFunction, Request, Response } from "express";
import { db } from "../db/dbPool";
import imagesTable from "../db/schema/images";
import { eq } from "drizzle-orm";
import { IMAGE_URL } from "../settings";
export function createImageHandler(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { alt, albumId } = req.body;
  const files = req.files;

  if (Array.isArray(files)) {
    files?.forEach(async (image: Express.Multer.File) => {
      await db.insert(imagesTable).values({
        filename: image.originalname,
        src: `${IMAGE_URL}${image.originalname}`,
        isCover: false,
        isShown: false,
        albumId: albumId,
        alt: alt || image.originalname,
      });
    });
  }

  res.status(201).json({ hello: "from create image" });
}

export async function getImageWithIdHandler(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
) {
  const imageID = req.params.id;
  const [image] = await db
    .select()
    .from(imagesTable)
    .where(eq(imagesTable.pkid, Number(imageID)));
  res.json(image);
}

export async function updateImageDetails(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
) {
  const id = req.params.id;
  const { alt, isCover, isShown } = req.body;

  await db
    .update(imagesTable)
    .set({ alt, isCover, isShown })
    .where(eq(imagesTable.pkid, Number(id)));

  res.json({ finish: "end" });
}
