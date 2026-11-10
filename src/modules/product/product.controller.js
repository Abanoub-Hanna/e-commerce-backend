import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../utilities/catchError.js";
import { createOne, deleteOne, getItems, getOne, updateItem } from "../../factorcode/factor.js";
import { serviceProductRoute } from "../../services/product.services.js";

const addProduct = catchError(async (req, res, next) => {
  req.body =await serviceProductRoute(req, req.files);
  let product=await createOne(productModel, req.body);
  res.status(201).json({ message: "success", product });
});

const getAllProducts = getItems(productModel, "userId");

const getProduct = getOne(productModel,"product")

const updateProduct = updateItem(productModel, "product","title");

const deleteProduct = deleteOne(productModel, "product");

export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
