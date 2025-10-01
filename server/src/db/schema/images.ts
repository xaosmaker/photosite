import { pgTable, varchar, boolean, integer } from "drizzle-orm/pg-core";
import { pkidWithTimestamps } from "./helpers";
import { photoAlbums } from ".";

const imagesTable = pgTable("images", {
  ...pkidWithTimestamps,
  src: varchar().notNull(),
  filename: varchar().notNull().unique(),
  isCover: boolean("is_cover").notNull().default(false),
  isShown: boolean("is_shown").notNull().default(false),
  alt: varchar().notNull(),
  albumId: integer("album_id")
    .notNull()
    .references(() => photoAlbums.pkid),
});

export default imagesTable;
