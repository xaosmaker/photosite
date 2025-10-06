import { z } from "zod/v4";

export const photoAlbumValidators = z.object({
  categoriesId: z.string({ error: "This field is Required" }),
  isCover: z.boolean({ error: "This field is required" }),
  description: z.string(),
  title: z
    .string()
    .refine(
      (val) => val.match(/^(?=[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ])[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ& ]+$/),
      {
        error:
          "Category contains only letters and spaces and must start with letter",
      },
    ),
  images: z.array(z.file()).optional(),
  altText: z.string().optional(),
});

export const imageFieldsValidator = z.object({
  alt: z.string(),
  isCover: z.boolean(),
  isShown: z.boolean(),
  pkid: z.int(),
});
