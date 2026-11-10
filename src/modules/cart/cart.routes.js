import express from "express";
import { protectedRoute } from "../authentication/auth.controller.js";
import * as validateCart from "./cart.validation.js";
import { validate } from "../../middleware/validate.js";
const cartRouter = express.Router();
import * as cart from "./cart.controller.js";

cartRouter.post("/", protectedRoute, validate(validateCart.validateAddToCart), cart.addToCart);
cartRouter.route("/:productId")
.get(protectedRoute, validate(validateCart.validateGetCart), cart.getCart)
.put(protectedRoute, validate(validateCart.validateUpdateCart), cart.updateCartItem)
.delete( protectedRoute, validate(validateCart.validateRemoveFromCart), cart.deleteCartItem);
cartRouter.delete("/clear/:id",protectedRoute,cart.deleteCart)
export default cartRouter;

