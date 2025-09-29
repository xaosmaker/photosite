import { NextFunction, Request, Response } from "express";
export function createImageHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(201).json({ hello: "from create image" });
}
