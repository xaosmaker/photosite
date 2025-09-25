import {
  pgTable,
  integer,
  boolean,
  varchar,
  index,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    is_admin: boolean().default(false),
    user_type: varchar().notNull().default("user"),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp(),
  },
  (table) => [index("email_idx").on(table.email)],
);
