function envExists(env: string | undefined) {
  if (env) {
    return env;
  }
  throw new Error(`ENV does not exist`);
}
const DATABASE_URL = envExists(process.env.DATABASE_URL);
const JWT_KEY = envExists(process.env.JWT_KEY);
const JWT_EXPIRES = envExists(process.env.JWT_EXPIRES);
const SALT_TIMES = envExists(process.env.SALT_TIMES);
const IMAGE_URL = envExists(process.env.IMAGE_URL);

export { DATABASE_URL, JWT_KEY, JWT_EXPIRES, SALT_TIMES, IMAGE_URL };
