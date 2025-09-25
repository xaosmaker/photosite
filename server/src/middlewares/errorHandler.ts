import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";
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

  res.status(500).json("something went wrong");
}
