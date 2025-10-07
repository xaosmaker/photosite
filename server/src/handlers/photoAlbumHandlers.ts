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
import { desc } from "drizzle-orm";
export async function createPhotoAlbumHandler(
  req: Request<{}, {}, { alt: string } & PhotoAlbum>,
  res: Response,
  _next: NextFunction,
) {
  //TODO: fix the original alt name
  const { title, description, isCover, categoriesId, alt } = req.body;
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
          alt: alt || image.originalname,
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
  const albums = await db.query.photoAlbums.findMany({
    columns: {
      pkid: true,
      title: true,
      description: true,
      isCover: true,
      categoriesId: true,
      photoAlbumSlug: true,
    },
    with: {
      images: {
        columns: {
          albumId: true,
          pkid: true,
          src: true,
          filename: true,
          isCover: true,
          isShown: true,
          alt: true,
        },
        orderBy: [desc(imagesTable.isCover), desc(imagesTable.isShown)],
      },
    },
  });
  res.json(albums);
}

export async function getPhotoAlbumsWithIdHandler(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    throw new FieldAlreadyExistsError("Something went Wrong contact the admin");
  }

  const albums = await db.query.photoAlbums.findMany({
    where: (photos) => eq(photos.pkid, id),
    columns: {
      pkid: true,
      title: true,
      description: true,
      isCover: true,
      categoriesId: true,
      photoAlbumSlug: true,
    },
    with: {
      images: {
        columns: {
          albumId: true,
          pkid: true,
          src: true,
          filename: true,
          isCover: true,
          isShown: true,
          alt: true,
        },
        orderBy: [desc(imagesTable.isCover), desc(imagesTable.isShown)],
      },
    },
  });
  res.json(albums);
}
export async function updatePhotoAlbumHandler(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
) {
  const id = Number(req.params.id);

  const { title, description, isCover, categoriesId, pkid } = req.body;
  if (isNaN(id) || Number(pkid) !== id) {
    throw new FieldAlreadyExistsError("Please Send a valid Form");
  }

  const updatedData = await db
    .update(photoAlbumsTable)
    .set({
      title,
      description,
      isCover,
      categoriesId,
    })
    .where(eq(photoAlbumsTable.pkid, id))
    .returning();

  res.status(200).json(updatedData);
}

// title
// description
// isCover
// photoAlbumSlug
// categoriesId
