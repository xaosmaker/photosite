import { pgTable, varchar } from "drizzle-orm/pg-core";
import { pkidWithTimestamps } from "./helpers";

const categoriesTable = pgTable("categories", {
  ...pkidWithTimestamps,
  categoryName: varchar("category_name", { length: 200 }).unique().notNull(),
  categorySlug: varchar("category_slug").notNull(),
});

export default categoriesTable;
