import { NextFunction, Response, Request } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export function isAdminMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (req.user && req.user.isAdmin) {
    next();
    return;
  }
  throw new UnauthorizedError();
}
