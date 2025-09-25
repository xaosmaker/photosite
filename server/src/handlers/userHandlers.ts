import { Request, Response, NextFunction } from "express";
import { usersTable } from "../db/schema/users";
import { db } from "../db/dbPool";
import { eq } from "drizzle-orm";
import { PasswordMismatchError } from "../errors/passwordMismatchError";
import { EmailExistsError } from "../errors/emailExistsError";
import { hash } from "bcrypt";
export default async function createUserHandler(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new PasswordMismatchError();
  }

  const [userExist] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (userExist) {
    throw new EmailExistsError();
  }
  const hashPass = await hash(password, 15);
  const [user] = await db
    .insert(usersTable)
    .values({ email: email, password: hashPass })
    .returning();
  user.password = "********";

  res.json(user);
}
