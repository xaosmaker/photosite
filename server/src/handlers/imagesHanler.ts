import { NextFunction, Request, Response } from "express";
import { db } from "../db/dbPool";
import imagesTable from "../db/schema/images";
import { eq } from "drizzle-orm";
export function createImageHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
