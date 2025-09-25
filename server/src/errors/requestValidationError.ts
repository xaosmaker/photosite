import { FieldValidationError, ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("invalid field on request");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors(): Array<{ message: string; field?: string }> {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: (error as FieldValidationError).path,
      };
    });
  }
}
