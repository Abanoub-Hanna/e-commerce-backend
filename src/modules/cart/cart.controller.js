import { cartModel } from "../../../database/models/cart.model.js";
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import { productModel } from "../../../database/models/product.model.js";
import { addToCartService, deleteCartItemService, getCartService, updateCartItemService } from "../../services/cart.services.js";
import { deleteOne} from "../../factorcode/factor.js";

const addToCart = async (req, res, next) => {
  const cart=await addToCartService(req.user._id,req.body.productId)
  res.status(201).json({ message: "success", cart });
};

const getCart = catchError(async (req, res, next) => {
  const cart=await getCartService(req.user._id)
  res.status(200).json({ message: "success", cart });
});
const updateCartItem = async (req, res, next) => {
   const cart=await updateCartItemService(
    req.user._id,
    req.params.productId,
    req.body.quantity
  )
   res.status(200).json({ message: "success", cart });
};
const deleteCartItem = async (req, res, next) => {
  const cart=await deleteCartItemService(req.user._id,req.params.productId);
  res.status(200).json({ message: "success", cart });
};
const deleteCart = deleteOne(cartModel, "cart");

export {
   addToCart,
    getCart, 
    updateCartItem, 
    deleteCartItem,
    deleteCart
   
   };
