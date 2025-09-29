import { z, ZodError } from "zod/v4";
import { CustomValidationError, SerializeError } from "./customValidationError";

export class FieldValidationError<T> extends CustomValidationError<T> {
  constructor(
    public error: ZodError<T> | string,
    public formData: Record<keyof T, FormDataEntryValue | null>,
    public success: boolean = false,
  ) {
    super(error, formData);
    Object.setPrototypeOf(this, FieldValidationError.prototype);
  }

  serializeError(): SerializeError<T> {
    if (this.error instanceof ZodError) {
      const error = z.flattenError(this.error).fieldErrors;
      return {
        errors: { ...error, root: [] },
        inputs: this.formData,
        success: this.success || false,
      };
    }

    return {
      errors: { root: [this.error] },
      inputs: this.formData,
      success: this.success,
    };
  }
}
