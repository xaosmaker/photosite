import { z } from "zod/v4";
import {
  imageFieldsValidator,
  imageValidator,
  photoAlbumValidators,
} from "./photAlbumValidators";

export type PhotoAlbum = z.infer<typeof photoAlbumValidators>;

export type ImageForm = z.infer<typeof imageFieldsValidator>;
export type ImageValidator = z.infer<typeof imageValidator>;
