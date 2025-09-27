import { pgTable, boolean, varchar, index } from "drizzle-orm/pg-core";
import { pkidWithTimestamps } from "./helpers";

const usersTable = pgTable(
  "users",
  {
    ...pkidWithTimestamps,
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    isAdmin: boolean("is_admin").default(false).notNull(),
    userType: varchar("user_type").notNull().default("user"),
  },
  (table) => [index("email_idx").on(table.email)],
);

export default usersTable;
