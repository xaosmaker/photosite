import { defineConfig } from "drizzle-kit";

function envExists(env: string | undefined) {
  if (env) {
    return env;
  }
  throw new Error(`ENV does not exist`);
}

const DATABASE_URL = envExists(process.env.DATABASE_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
