import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../settings";

export const db = drizzle(DATABASE_URL);
