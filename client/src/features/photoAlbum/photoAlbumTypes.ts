import { z } from "zod/v4";
import { photoAlbumValidators } from "./photAlbumValidators";

export type PhotoAlbum = z.infer<typeof photoAlbumValidators>;
export interface PhotoAlbumResponse<T>
  extends Omit<PhotoAlbum, "images" | "altText"> {
  pkid: number;
  photoAlbumSlug: string;
  images: T[];
}
