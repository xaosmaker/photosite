import { Request, Response, NextFunction } from "express";
import { usersTable } from "../db/schema/users";
import { db } from "../db/dbPool";
import { eq } from "drizzle-orm";
import { PasswordMismatchError } from "../errors/passwordMismatchError";
import { EmailExistsError } from "../errors/emailExistsError";
import { compare, hash } from "bcrypt";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { jwtToResponse } from "../utils/jwtGenerate";
import { SALT_TIMES } from "../settings";

export async function createUserHandler(
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
  const hashPass = await hash(password, Number(SALT_TIMES));
  const [user] = await db
    .insert(usersTable)
    .values({ email: email, password: hashPass })
    .returning();
  user.password = "********";

  jwtToResponse(res, user);

  res.status(201).json(user);
}

export async function loginUserHandler(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { email, password } = req.body;
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user) {
    throw new InvalidCredentialsError();
  }
  const isPassMatch = await compare(password, user.password);

  if (!isPassMatch) {
    throw new InvalidCredentialsError();
  }

  jwtToResponse(res, user);

  res.json({ message: "successfully login" });
}
