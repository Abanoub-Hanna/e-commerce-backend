import { catchError } from "../../utilities/catchError.js";
import { AppError } from "../../utilities/AppError.js";
import { subCategoryModel } from "../../../database/models/subCategory.model.js";
import { createOne, deleteOne, getItems, getOne, updateItem } from "../../factorcode/factor.js";

const addSubCategory = catchError(async (req, res, next) => {
 
  let subCategory=await createOne(subCategoryModel,req.body);
  res.status(201).json({ message: "success" , subCategory });
});

const getAllSubCategories = getItems(subCategoryModel, "category");

const getSubCategory = getOne(subCategoryModel, "subcategory");

const updateSubCategory = updateItem(subCategoryModel, "subcategory", "name");

const deleteSubCategory = deleteOne(subCategoryModel, "subcategory");

export {
  addSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
