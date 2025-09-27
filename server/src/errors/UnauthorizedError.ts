import { CustomError } from "./customError";

export class UnauthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super("unauthorized");
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  serializeErrors(): Array<{ message: string; field?: string }> {
    return [
      {
        message: "Unathorized Access Denied",
      },
    ];
  }
}
