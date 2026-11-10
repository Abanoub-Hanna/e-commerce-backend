import slugify from "slugify";
import { catchError } from "../../utilities/catchError.js";
import { AppError } from "../../utilities/AppError.js";
import { brandModel } from "../../../database/models/brand.model.js";
import { createOne, deleteOne, getItems, getOne, updateItem } from "../../factorcode/factor.js";
import { uploadImage } from "../../clouldNairy/cloudNairy.js";
import { serviceBrandRoute } from "../../services/brand.services.js";

const addBrand = catchError(async (req, res, next) => {
   req.body = await serviceBrandRoute(req.body, req.file);
   let brand = await createOne(brandModel,req.body);
   res.status(201).json({message:"success",brand});
});

const getAllBrands = getItems(brandModel,'categoryId');

const getBrand = getOne(brandModel,"brand")

//handleError by catchError and globalHandle
const updateBrand = updateItem(brandModel,'brand');
const deleteBrand = deleteOne(brandModel,'brand');

export { addBrand, getAllBrands, updateBrand, deleteBrand, getBrand };
