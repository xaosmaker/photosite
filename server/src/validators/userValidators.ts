import { body } from "express-validator";

export function createUserValidator() {
  return [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      })
      .withMessage(
        "Password require 1 lower case char, 1 number, 1 sumbol and minimum length 8",
      ),
    body("confirmPassword")
      .isLength({ min: 8 })
      .withMessage("confirm password is required"),
  ];
}

export function loginUserValidator() {
  return [
    body("email").isEmail().withMessage("email cant be empty"),
    body("password").notEmpty().withMessage("Password can't be empty"),
  ];
}
