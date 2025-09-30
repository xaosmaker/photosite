import { ZodError } from "zod/v4";

export type SerializeError<T> = {
  errors: { [K in keyof T | "root"]?: string[] | undefined };
  inputs: Record<keyof T, FormDataEntryValue | null> | undefined;
  success: boolean;
};

export abstract class CustomValidationError<T> {
  constructor(
    public error:
      | ZodError<T>
      | string
      | Array<{ message: string; field?: string }>
      | undefined,
    public formData: Record<keyof T, FormDataEntryValue | null>,
    public success?: boolean,
  ) {}
  abstract serializeError(): SerializeError<T>;
}
