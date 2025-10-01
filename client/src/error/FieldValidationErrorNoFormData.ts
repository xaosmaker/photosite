import { CustomValidationError, SerializeError } from "./customValidationError";

export class FieldValidationErronNoFormData<
  T,
> extends CustomValidationError<T> {
  constructor(public error: Array<{ message: string; field?: string }>) {
    super(error, undefined);
  }
  serializeError(): SerializeError<T> {
    return {
      errors: { root: this.error.map((error) => error.message) },
      inputs: undefined,
      success: false,
    };
  }
}
