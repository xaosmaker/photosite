import { CustomError } from "./customError";

export class PasswordMismatchError extends CustomError {
  statusCode = 400;
  constructor() {
    super("password mismatch");

    Object.setPrototypeOf(this, PasswordMismatchError.prototype);
  }
  serializeErrors(): Array<{ message: string; field?: string }> {
    return [{ message: "password mismatch", field: "confirmPassword" }];
  }
}
