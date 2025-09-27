import { Response } from "express";
import { JWT_EXPIRES, JWT_KEY } from "../settings";
import jwt from "jsonwebtoken";
import { User } from "../types/user";

export function jwtToResponse(
  res: Response,
  user: Pick<User, "email" | "pkid" | "isAdmin">,
) {
  const access = jwt.sign({ id: user.pkid }, JWT_KEY, {
    expiresIn: Number(JWT_EXPIRES),
  });

  res.cookie("access", access, {
    secure: true,
    httpOnly: true,
    maxAge: Number(JWT_EXPIRES) * 1000,
    sameSite: "strict",
  });
  res.cookie(
    "loggedIn",
    JSON.stringify({ loggedIn: true, isAdmin: user.isAdmin }),
    { maxAge: Number(JWT_EXPIRES) * 1000, secure: true, sameSite: "strict" },
  );
}
