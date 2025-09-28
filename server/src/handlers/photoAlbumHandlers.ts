import { Request, Response, NextFunction } from "express";
import { PhotoAlbum } from "../types/photoAlbumTypes";
import { db } from "../db/dbPool";
import categoriesTable from "../db/schema/categories";
import { eq } from "drizzle-orm";
import { DontExistsError } from "../errors/dontExistError";
import photoAlbumsTable from "../db/schema/photoAlbums";
import { FieldAlreadyExistsError } from "../errors/fieldAlreadyExistsError";
export async function createPhotoAlbumHandler(
  req: Request<{}, {}, PhotoAlbum>,
  res: Response,
  _next: NextFunction,
) {
  const { title, description, isCover, categoriesId } = req.body;

  const [category] = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.pkid, categoriesId));

  if (!category) {
    throw new DontExistsError("category does not exist");
  }

  const photoSlug = title.trim().replace(/ /g, "_");

  try {
    const photoAlbum = await db
      .insert(photoAlbumsTable)
      .values({
        title: title.trim(),
        description,
        isCover,
        categoriesId,
        photoAlbumSlug: photoSlug,
      })
      .returning();
    res.status(201).json(photoAlbum);
  } catch (e) {
    throw new FieldAlreadyExistsError(`Album with '${title}' already exists`);
  }
}

// title
// description
// isCover
// photoAlbumSlug
// categoriesId
