import { CustomError } from "./customError";

export class EmailExistsError extends CustomError {
  statusCode = 400;
  constructor() {
    super("email already exists");

    Object.setPrototypeOf(this, EmailExistsError.prototype);
  }
  serializeErrors(): Array<{ message: string; field?: string }> {
    return [{ message: "email already exists", field: "email" }];
  }
}
