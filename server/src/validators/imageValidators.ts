import { body } from "express-validator";

export function updateImageValidator() {
  return [
    body("isCover").isBoolean().notEmpty().withMessage("is Cover required"),
    body("isShown").isBoolean().notEmpty().withMessage("is Shown required"),
    body("alt").isString().notEmpty().withMessage("alt required"),
  ];
}
