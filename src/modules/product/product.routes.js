import express from "express";
import * as product from "./product.controller.js";
import * as validateProduct from "./product.validation.js";
import { validate } from "../../middleware/validate.js";
import { uploadMultiFile } from "../../multer/multer.js";
import { allowTo, protectedRoute } from "../authentication/auth.controller.js";
import reviewRoutes from "../review/review.routes.js";

const productRoutes = express.Router({mergeParams:true});
productRoutes.use("/:productId/reviews",reviewRoutes)

let arrFields=[{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]
productRoutes.route("/")
  .post(protectedRoute,allowTo('admin'),uploadMultiFile(arrFields,"product"),validate(validateProduct.validateAddProduct),product.addProduct)
  .get(product.getAllProducts);
productRoutes.route("/:id").
  get(validate(validateProduct.validateGetProduct),product.getProduct)
  .put(protectedRoute,allowTo('admin'),validate(validateProduct.validateUpdateProduct),product.updateProduct)
  .delete(protectedRoute,allowTo('admin'),validate(validateProduct.validateDeleteProduct),product.deleteProduct);

export default productRoutes;
