import express from "express";
import * as subCategory from "./subCategory.controller.js";
import { validate } from "../../middleware/validate.js";
import * as subCategoryValidation from "./subCategory.validation.js";
import { allowTo, protectedRoute } from "../authentication/auth.controller.js";
const subCategoryRoutes = express.Router({mergeParams:true});

subCategoryRoutes.route("/")
  .post(protectedRoute,allowTo("admin"),validate(subCategoryValidation.validateAddSubCategory),subCategory.addSubCategory)
  .get(subCategory.getAllSubCategories);
subCategoryRoutes.route("/:id").
  get(validate(subCategoryValidation.validateGetOneSubCategory),subCategory.getSubCategory)
  .put(protectedRoute,allowTo("admin"),validate(subCategoryValidation.validateUpdateSubCategory),subCategory.updateSubCategory)
  .delete(protectedRoute,allowTo("admin"),validate(subCategoryValidation.validateDeleteSubCategory),subCategory.deleteSubCategory);

export default subCategoryRoutes;
