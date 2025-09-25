function envExists(env: string | undefined) {
  if (env) {
    return env;
  }
  throw new Error(`ENV does not exist`);
}
export const DATABASE_URL = envExists(process.env.DATABASE_URL);
