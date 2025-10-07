import { body } from "express-validator";

export function updateImageValidator() {
  return [
    body("isCover").isBoolean().notEmpty().withMessage("is Cover required"),
    body("isShown").isBoolean().notEmpty().withMessage("is Shown required"),
    body("alt").isString().notEmpty().withMessage("alt required"),
  ];
}

export function postImageValidator() {
  return [
    body("alt").isString().notEmpty().withMessage("Alt field required"),
    body("albumId")
      .isInt({ min: 1 })
      .notEmpty()
      .withMessage("AlbumId field required"),
  ];
}
