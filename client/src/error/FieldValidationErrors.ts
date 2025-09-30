import { z, ZodError } from "zod/v4";
import { CustomValidationError, SerializeError } from "./customValidationError";

export class FieldValidationError<T> extends CustomValidationError<T> {
  constructor(
    public error:
      | ZodError<T>
      | string
      | Array<{ message: string; field?: string }>,
    public formData: Record<keyof T, FormDataEntryValue | null>,
    public success: boolean = false,
  ) {
    super(error, formData);
    Object.setPrototypeOf(this, FieldValidationError.prototype);
  }

  serializeError(): SerializeError<T> {
    if (this.success) {
      return {
        errors: { root: undefined },
        inputs: undefined,
        success: this.success,
      };
    }
    if (this.error instanceof ZodError) {
      const error = z.flattenError(this.error).fieldErrors;
      return {
        errors: { ...error, root: undefined },
        inputs: this.formData,
        success: this.success || false,
      };
    }
    if (Array.isArray(this.error)) {
      return {
        errors: { root: this.error.map((error) => error.message) },
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
