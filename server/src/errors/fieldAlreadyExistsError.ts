import { CustomError } from "./customError";

export class FieldAlreadyExistsError extends CustomError {
  statusCode = 400;
  constructor(public name: string) {
    super(name);

    Object.setPrototypeOf(this, FieldAlreadyExistsError.prototype);
  }
  serializeErrors(): Array<{ message: string; field?: string }> {
    return [{ message: this.name }];
  }
}
