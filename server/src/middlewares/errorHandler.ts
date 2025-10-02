import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";
import { FieldAlreadyExistsError } from "../errors/fieldAlreadyExistsError";
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.serializeErrors());
    return;
  }
  if (err.message) {
    const error = new FieldAlreadyExistsError(err.message);
    res.status(error.statusCode).json(error.serializeErrors());
    return;
  }

  const error = new FieldAlreadyExistsError(
    "Something went Wrong",
  ).serializeErrors();
  res.status(500).json(error);
}
