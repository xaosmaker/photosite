import { z } from "zod/v4";
import { photoAlbumValidators } from "./photAlbumValidators";

export type PhotoAlbum = z.infer<typeof photoAlbumValidators>;
