import { defineConfig } from "drizzle-kit";

function envExists(env: string | undefined) {
  if (env) {
    return env;
  }
  throw new Error(`ENV does not exist`);
}

const DATABASE_URL = envExists(process.env.DATABASE_URL);

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },

  verbose: true,
  strict: true,
});
