import { createCategoryValidator } from "@/validators/createCategoryValidators";
import { z } from "zod/v4";

export type Category = z.infer<typeof createCategoryValidator>;
