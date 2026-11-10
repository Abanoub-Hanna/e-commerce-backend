import express from "express";
import * as category from "./category.controller.js";
import subCategoryRoutes from "../subCategory/subCategory.routes.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryValidation, deleteCategoryValidation, getOneCategoryValidation, updateCategoryValidation } from "./category.validation.js";
import {  uploadSingleFile } from "../../multer/multer.js";
import brandRoutes from "../brand/brand.routes.js";
import { allowTo, protectedRoute } from "../authentication/auth.controller.js";
const categoryRoutes = express.Router();

//merge params
 categoryRoutes.use('/:categoryId/subcategories',subCategoryRoutes);
 categoryRoutes.use('/:categoryId/brands',brandRoutes);


categoryRoutes.route("/")
//upload file
  .post(protectedRoute,allowTo("admin"),uploadSingleFile("image","category"),validate(addCategoryValidation),category.addCategory)
  .get(category.getAllCategories);
categoryRoutes.route("/:id").
  get(validate(getOneCategoryValidation),category.getCategory)
  .put(protectedRoute,allowTo("admin"),validate(updateCategoryValidation),category.updateCategory)
  .delete(protectedRoute,allowTo("admin"),validate(deleteCategoryValidation),category.deleteCategory);

export default categoryRoutes;