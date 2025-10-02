import { pgTable, varchar, boolean, integer, text } from "drizzle-orm/pg-core";
import { pkidWithTimestamps } from "./helpers";
import categoriesTable from "./categories";
import { relations } from "drizzle-orm";
import imagesTable from "./images";

const photoAlbumsTable = pgTable("photo_albums", {
  ...pkidWithTimestamps,
  title: varchar({ length: 255 }).notNull().unique(),
  description: text(),
  isCover: boolean("is_cover").notNull().default(false),
  photoAlbumSlug: varchar("photo_album_slug").notNull(),
  categoriesId: integer("categories_id")
    .references(() => categoriesTable.pkid)
    .notNull(),
});
export const photoAlbumRelations = relations(photoAlbumsTable, ({ many }) => ({
  images: many(imagesTable),
}));

export default photoAlbumsTable;
