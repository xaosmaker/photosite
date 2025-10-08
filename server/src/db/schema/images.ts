import { pgTable, varchar, boolean, integer } from "drizzle-orm/pg-core";
import { pkidWithTimestamps } from "./helpers";
import photoAlbumsTable from "./photoAlbums";
import { relations } from "drizzle-orm";

const imagesTable = pgTable("images", {
  ...pkidWithTimestamps,
  src: varchar().notNull(),
  filename: varchar().notNull().unique(),
  isCover: boolean("is_cover").notNull().default(false),
  isShown: boolean("is_shown").notNull().default(false),
  alt: varchar().notNull(),
  width: integer().notNull().default(0),
  height: integer().notNull().default(0),
  albumId: integer("album_id")
    .notNull()
    .references(() => photoAlbumsTable.pkid),
});

export const imagesRelations = relations(imagesTable, ({ one }) => ({
  image: one(photoAlbumsTable, {
    fields: [imagesTable.albumId],
    references: [photoAlbumsTable.pkid],
  }),
}));

export default imagesTable;
