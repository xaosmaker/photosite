"use server";
import { FieldValidationError } from "@/error/FieldValidationErrors";
import { Category } from "@/types/CategoryTypes";
import { createCategoryValidator } from "@/validators/createCategoryValidators";

export async function createCategoryAction(
  _previousState: unknown,
  formData: FormData,
) {
  const data = {
    title: formData.get("title"),
  };

  const validated = createCategoryValidator.safeParse(data);

  if (!validated.success) {
    const error = new FieldValidationError<Category>(
      validated.error,
      data,
    ).serializeError();

    return error;
  }
  try {
    await new Promise((_resolve, _reject) => {
      setTimeout(() => _reject(new Error("error message")), 2000);
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log("enter");

      const error = new FieldValidationError<Category>(
        e.message,
        data,
      ).serializeError();
      console.log(error.errors);

      return error;
    }
  }
}
