import { CustomError } from "./customError";

export class InvalidCredentialsError extends CustomError {
  statusCode = 400;
  constructor() {
    super("invalid credentials");
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
  serializeErrors(): Array<{ message: string; field?: string }> {
    return [{ message: "Invalid Credentials" }];
  }
}
