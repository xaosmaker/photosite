import { integer, timestamp } from "drizzle-orm/pg-core";

export const pkidWithTimestamps = {
  pkid: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
};
