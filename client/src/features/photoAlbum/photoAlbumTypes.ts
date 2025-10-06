import { z } from "zod/v4";
import {
  imageFieldsValidator,
  photoAlbumValidators,
} from "./photAlbumValidators";
import { ImageType } from "@/types/imageType";

export type PhotoAlbum = z.infer<typeof photoAlbumValidators>;
export interface PhotoAlbumResponse
  extends Omit<PhotoAlbum, "images" | "altText"> {
  pkid: number;
  photoAlbumSlug: string;
  images: ImageType[];
}

export type ImageForm = z.infer<typeof imageFieldsValidator>;
