import { z } from "zod/v4";
import { createCategoryValidator } from "../catValidator";

export type Category = z.infer<typeof createCategoryValidator>;
export type CategoryResponse = Category & {
  pkid: number;
};
