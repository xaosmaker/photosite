import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../settings";

console.log("urr", DATABASE_URL);

export const db = drizzle(DATABASE_URL);
