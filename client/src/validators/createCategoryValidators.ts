import { z } from "zod/v4";

export const createCategoryValidator = z.object({
  categoryName: z
    .string()
    .refine(
      (val) => val.match(/^(?=[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ])[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ ]+$/),
      {
        error:
          "Category contains only letters and spaces and must start with letter",
      },
    ),
});
