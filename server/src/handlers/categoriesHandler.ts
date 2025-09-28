import { Request, Response, NextFunction } from "express";
import { db } from "../db/dbPool";
import categoriesTable from "../db/schema/categories";
import { DrizzleQueryError } from "drizzle-orm";
import { FieldAlreadyExistsError } from "../errors/fieldAlreadyExistsError";

export async function createCategoryHandler(
  req: Request<{}, {}, { categoryName: string }>,
  res: Response,
  _next: NextFunction,
) {
  const { categoryName } = req.body;
  const categorySlug = categoryName.trim().replace(/ /g, "_");
  try {
    const cat = await db
      .insert(categoriesTable)
      .values({
        categoryName: categoryName.trim(),
        categorySlug,
      })
      .returning();
    res.json(cat);
    return;
  } catch (e) {
    if (e instanceof DrizzleQueryError) {
      throw new FieldAlreadyExistsError(
        `field with name '${categoryName}' already exists in the db`,
      );
    }
  }
}
