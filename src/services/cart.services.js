import { cartModel } from "../../database/models/cart.model.js";
import { productModel } from "../../database/models/product.model.js";
import { AppError } from "../utilities/AppError.js";

const addToCartService = async (userId, productId) => {
  const product = await productModel.findById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  if (product.stock < 1) {
    throw new AppError("Product out of stock", 400);
  }

  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    cart = await cartModel.create({ userId, products: [] });
  }

  const existingProduct = cart.products.find(
    (item) => item.productId.toString() === productId,
  );

  if (existingProduct) {
    if (existingProduct.quantity + 1 > product.stock) {
      throw new AppError("Cannot add more than available stock", 400);
    }

    existingProduct.quantity += 1;
  } else {
    cart.products.push({
      productId: product._id,
      quantity: 1,
      price: product.price,
      title: product.title,
      imageCover: product.imageCover,
    });
  }

  await cart.save();
  return cart;
};
const getCartService=async(userId)=>{
 const cart = await cartModel.findOne({ userId })
 .populate("products.productId", "title price imageCover stock");
  if (!cart) throw new AppError("Cart is empty", 404);
  return cart
}
const updateCartItemService = async (userId, productId, quantity) => {
  if (quantity < 0) {
    throw new AppError("Quantity cannot be negative", 400);
  }
  const cart = await cartModel.findOne({ userId });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const product = await productModel.findById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const itemIndex = cart.products.findIndex(
    (item) => item.productId._id.toString() === productId,
  );

  if (itemIndex === -1) {
    throw new AppError("Product not found in cart", 404);
  }

  if (quantity > product.stock) {
    throw new AppError("Cannot set quantity more than available stock", 400);
  }

  if (quantity === 0) {
    cart.products.splice(itemIndex, 1);
  } else {
    cart.products[itemIndex].quantity = quantity;
  }

  await cart.save();
  return cart;
};

const deleteCartItemService = async (userId, productId) => {
  const cart = await cartModel.findOne({ userId });
  if (!cart) return next(new AppError("Cart not found", 404));

  const itemIndex = cart.products.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    throw new AppError("Product not found in cart", 404);
  }
  cart.products.splice(itemIndex, 1);
  await cart.save();
  return cart;
};

export { addToCartService, updateCartItemService, deleteCartItemService,getCartService };
