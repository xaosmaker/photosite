"use server";
import { FieldValidationError } from "@/error/FieldValidationErrors";
import { serverURL } from "@/lib/serverURL";
import { Category } from "@/types/CategoryTypes";
import { postRequest } from "@/utils/requests";
import { createCategoryValidator } from "@/validators/createCategoryValidators";

export async function createCategoryAction(
  _previousState: unknown,
  formData: FormData,
) {
  console.log(1, formData);

  const data = {
    categoryName: formData.get("categoryName"),
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
    const res = await postRequest(
      `${serverURL}/api/categories`,
      "application/json",
      validated.data,
    );
    const resData = await res.json();

    console.log(resData);

    if (res.status !== 201) {
      return new FieldValidationError<Category>(resData, data).serializeError();
    }
  } catch (e) {
    console.log(11, e);

    if (e instanceof Error) {
      return new FieldValidationError<Category>(
        e.message,
        data,
      ).serializeError();
    }
  }
}
