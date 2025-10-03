import { body, param } from "express-validator";

export function createPhotoAlbumValidators() {
  return [
    body("title")
      .isLength({ min: 2 })
      .withMessage("title should be 2 chars and more")
      .matches(/^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ &]+$/)
      .withMessage("Title contains only letters, spaces and & char"),
    body("description")
      .isLength({ min: 2 })
      .withMessage("description should be 2 chars and more"),
    body("isCover").isBoolean().withMessage("this should be true or false"),
    body("categoriesId")
      .isInt({ min: 1 })
      .withMessage("This field is required"),
  ];
}

export function idParamsValidator() {
  return [param("id").isInt({ min: 1 }).withMessage("Params required")];
}
