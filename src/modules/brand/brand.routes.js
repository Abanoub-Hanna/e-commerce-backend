import express from "express";
import * as brands from "./brand.controller.js";
import { validate } from "../../middleware/validate.js";
import { validateAddBrand, validateDeleteBrand, validateGetOneBrand, validateUpdateBrand } from "./brand.validation.js";
import { uploadSingleFile } from "../../multer/multer.js";
import { allowTo, protectedRoute } from "../authentication/auth.controller.js";

const brandRoutes = express.Router({mergeParams:true});

brandRoutes.route("/")
  .post(protectedRoute,allowTo("admin"),uploadSingleFile("logo","brand"),validate(validateAddBrand),brands.addBrand)
  .get(brands.getAllBrands);
brandRoutes.route("/:id")
  .get(validate(validateGetOneBrand),brands.getBrand)
  .put(protectedRoute,allowTo("admin"),validate(validateUpdateBrand),brands.updateBrand)
  .delete(protectedRoute,allowTo("admin"),validate(validateDeleteBrand),brands.deleteBrand);

export default brandRoutes;
