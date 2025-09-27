import { parse } from "cookie";
import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_KEY } from "../settings";
import { db } from "../db/dbPool";
import userTable from "../db/schema/users";
import { eq } from "drizzle-orm";
export async function userMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const cookies = parse(req.headers.cookie!);
    const ver = verify(cookies["access"]!, JWT_KEY);

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.pkid, Number((ver as JwtPayload).pkid)));
    req.user = user;
  } catch (e) {
    req.user = undefined;
  }

  next();
}
