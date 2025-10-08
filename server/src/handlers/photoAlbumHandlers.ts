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
import fs from "node:fs/promises";
import path from "node:path";
import { imageSizeFromFile } from "image-size/fromFile";
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
        const size = await imageSizeFromFile(
          path.join("/test", image.originalname),
        );

        await db.insert(imagesTable).values({
          filename: image.originalname,
          src: `${IMAGE_URL}${image.originalname}`,
          isCover: false,
          isShown: false,
          albumId: photoAlbum.pkid,
          alt: alt || image.originalname,
          width: size.width,
          height: size.height,
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
          width: true,
          height: true,
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
          width: true,
          height: true,
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

export async function deletePhotoAlbumHandler(
  req: Request<{ id: string }>,
  res: Response,
  _next: NextFunction,
) {
  const id = req.params.id;

  const [albums] = await db.query.photoAlbums.findMany({
    where: (photos) => eq(photos.pkid, Number(id)),
    with: {
      images: true,
    },
  });
  const images = albums.images;
  images.forEach(async (image) => {
    await fs.rm(path.join("/test", image.filename), { force: true });
    await db.delete(imagesTable).where(eq(imagesTable.pkid, image.pkid));
  });

  await db
    .delete(photoAlbumsTable)
    .where(eq(photoAlbumsTable.pkid, Number(id)));

  res.json({ waht: "whata" });
}

// title
// description
// isCover
// photoAlbumSlug
// categoriesId
