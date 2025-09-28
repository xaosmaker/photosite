import { CustomError } from "./customError";

export class DontExistsError extends CustomError {
  statusCode = 400;
  constructor(public name: string) {
    super(name);

    Object.setPrototypeOf(this, DontExistsError.prototype);
  }
  serializeErrors(): Array<{ message: string; field?: string }> {
    return [{ message: this.name }];
  }
}
