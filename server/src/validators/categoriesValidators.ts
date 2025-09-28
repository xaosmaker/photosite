import { body } from "express-validator";

export function createCategoryValidator() {
  return [
    body("categoryName")
      .isLength({ min: 2 })
      .withMessage("Category should be 3 leters or more")
      .matches(/^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ ]+$/)
      .withMessage("Category contains only letters and spaces"),
  ];
}
