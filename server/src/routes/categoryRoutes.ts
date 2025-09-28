import express from "express";
import {
  createCategoryHandler,
  getAllCategoriesHandler,
} from "../handlers/categoriesHandler";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import { createCategoryValidator } from "../validators/categoriesValidators";
import { validateBodyFields } from "../middlewares/validateBodyFields";

const r = express.Router();

r.get("/", getAllCategoriesHandler);
r.use(isAdminMiddleware);
r.post(
  "/",
  createCategoryValidator(),
  validateBodyFields,
  createCategoryHandler,
);

export { r as categoriesRouter };
