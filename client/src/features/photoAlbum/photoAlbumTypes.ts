import { z } from "zod/v4";
import { photoAlbumValidators } from "./photAlbumValidators";

export type PhotoAlbum = z.infer<typeof photoAlbumValidators>;
export interface PhotoAlbumResponse
  extends Omit<PhotoAlbum, "images" | "altText"> {
  pkid: number;
  photoAlbumSlug: string;
  images: ImageType[];
}

export interface ImageType {
  pkid: number;
  src: string;
  filename: string;
  isCover: boolean;
  isShown: boolean;
  alt: string;
}
