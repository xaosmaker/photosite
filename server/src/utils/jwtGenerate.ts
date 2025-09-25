import { Response } from "express";
import { JWT_EXPIRES, JWT_KEY } from "../settings";
import jwt from "jsonwebtoken";
import { User } from "../types/user";

export function jwtToResponse(res: Response, user: User) {
  const jwt_key = jwt.sign({ id: user.id }, JWT_KEY, {
    expiresIn: Number(JWT_EXPIRES),
  });

  res.cookie("jwt_key", jwt_key, {
    secure: true,
    httpOnly: true,
    maxAge: Number(JWT_EXPIRES) * 1000,
    sameSite: "strict",
  });
  res.cookie(
    "loggedIn",
    JSON.stringify({ loggedIn: true, isAdmin: user.is_admin }),
    { maxAge: Number(JWT_EXPIRES) * 1000, secure: true, sameSite: "strict" },
  );
}
