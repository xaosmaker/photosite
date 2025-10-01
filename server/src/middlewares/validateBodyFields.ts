import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { validationResult } from "express-validator";
export function validateBodyFields(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const err = validationResult(req);
  console.log(req.body);

  if (!err.isEmpty()) {
    throw new RequestValidationError(err.array());
  }
  next();
}
