import photoAlbumsTable from "../db/schema/photoAlbums";

export type PhotoAlbum = typeof photoAlbumsTable.$inferSelect;
