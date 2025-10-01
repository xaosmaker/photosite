import { Request, Response, NextFunction } from "express";
import { PhotoAlbum } from "../types/photoAlbumTypes";
import { db } from "../db/dbPool";
import categoriesTable from "../db/schema/categories";
import { eq } from "drizzle-orm";
import { DontExistsError } from "../errors/dontExistError";
import photoAlbumsTable from "../db/schema/photoAlbums";
import { FieldAlreadyExistsError } from "../errors/fieldAlreadyExistsError";
import imagesTable from "../db/schema/images";
import { IMAGE_URL } from "../settings";
export async function createPhotoAlbumHandler(
  req: Request<{}, {}, PhotoAlbum>,
  res: Response,
  _next: NextFunction,
) {
  //TODO: fix the original alt name
  const { title, description, isCover, categoriesId } = req.body;
  const files = req.files;

  const [category] = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.pkid, categoriesId));

  if (!category) {
    throw new DontExistsError("category does not exist");
  }

  const photoSlug = title.trim().replace(/ /g, "_");

  try {
    const [photoAlbum] = await db
      .insert(photoAlbumsTable)
      .values({
        title: title.trim(),
        description,
        isCover,
        categoriesId,
        photoAlbumSlug: photoSlug,
      })
      .returning();
    if (Array.isArray(files)) {
      files?.forEach(async (image: Express.Multer.File) => {
        await db.insert(imagesTable).values({
          filename: image.originalname,
          src: `${IMAGE_URL}${image.originalname}`,
          isCover: false,
          isShown: false,
          albumId: photoAlbum.pkid,
          alt: image.originalname,
        });
      });
    }

    res.status(201).json(photoAlbum);
  } catch (e) {
    throw new FieldAlreadyExistsError(`Album with '${title}' already exists`);
  }
}
export async function getAllPhotoAlbumsHandler(
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const albums = await db
    .select({
      pkid: photoAlbumsTable.pkid,
      title: photoAlbumsTable.title,
      description: photoAlbumsTable.description,
      isCover: photoAlbumsTable.isCover,
      photoAlbumSlug: photoAlbumsTable.photoAlbumSlug,
    })
    .from(photoAlbumsTable);
  res.json(albums);
}

// title
// description
// isCover
// photoAlbumSlug
// categoriesId
