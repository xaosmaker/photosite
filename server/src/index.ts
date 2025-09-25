import { drizzle } from "drizzle-orm/node-postgres";
import { app } from "./server";
import { DATABASE_URL } from "./settings";

export const db = drizzle(DATABASE_URL);
app.listen(3001, () => {
  console.log("app listening on 3001");
});
