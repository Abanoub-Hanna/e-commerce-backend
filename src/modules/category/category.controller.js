import { categoryModel } from "../../../database/models/category.model.js";
import { catchError } from "../../utilities/catchError.js";
import {createOne, deleteOne,getItems,getOne,updateItem,} from "../../factorcode/factor.js";
import { serviceCategoryRoute } from "../../services/category.services.js";

const addCategory = catchError(async (req, res, next) => {
 req.body = await serviceCategoryRoute(req.body, req.file);
  let category = await createOne(categoryModel, req.body);
  res.status(201).json({ message: "success", category });
});

const getAllCategories = getItems(categoryModel, "categories");

const getCategory = getOne(categoryModel, "category");

const updateCategory = updateItem(categoryModel, "category");

const deleteCategory = deleteOne(categoryModel, "category");

export {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
