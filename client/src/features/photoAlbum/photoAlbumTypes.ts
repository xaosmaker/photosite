import { z } from "zod/v4";
import {
  imageFieldsValidator,
  imageValidator,
  photoAlbumValidators,
} from "./photAlbumValidators";
import { ImageType } from "@/types/imageType";

export type PhotoAlbum = z.infer<typeof photoAlbumValidators>;
export interface PhotoAlbumResponse extends Omit<PhotoAlbum, "images" | "alt"> {
  pkid: number;
  photoAlbumSlug: string;
  images: ImageType[];
}

export type ImageForm = z.infer<typeof imageFieldsValidator>;
export type ImageValidator = z.infer<typeof imageValidator>;
