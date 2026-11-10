import { cartModel } from "../../database/models/cart.model.js";
import { orderModel } from "../../database/models/order.model.js";
import { productModel } from "../../database/models/product.model.js";
import { AppError } from "../utilities/AppError.js";
import mongoose from "mongoose";
import Stripe from "stripe";
import { userModel } from "../../database/models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createOrderService = async (userId, shippingAddress) => {
  const cart = await cartModel.findOne({ userId });

  if (!cart || cart.products.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  for (let item of cart.products) {
    const product = await productModel.findById(item.productId);

    if (!product || product.stock < item.quantity) {
      throw new AppError(`Insufficient stock for product`, 400);
    }
    
  }
  const orderItems = cart.products.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
    title: item.title,
    imageCover: item.imageCover,
  }));

  const totalPrice = cart.totalPriceAfterDiscount || cart.totalPrice;

  const order = await orderModel.create({
    userId,
    orderItems,
    totalOrderPrice: totalPrice,
    shippingAddress,
  });

  // decrease stock
  for (let item of cart.products) {
    await productModel.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity },
    });
  }

  // clear cart
  cart.products = [];

  await cart.save();

  return order;
};
const getOrderService = async (id, user) => {
  const filter = {
    _id: id,
    isDeleted: false,
  };

  if (user.role !== "admin") {
    filter.userId = user._id;
  }

  const order = await orderModel.findOne(filter).populate(
    "orderItems.productId",
    "title imageCover price priceAfterDiscount"
  );

  if (!order) throw new AppError("Order not found", 404);

  return order;
};

const updateOrderService = async (id, status) => {
  const order = await orderModel.findById(id);
  if (!order) throw new AppError("Order not found", 404);
  order.status = status;
  if (status === "paid") {
    order.paidAt = Date.now();
  }
  if (status === "delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();
  return order;
};

const deleteOrderService = async (id) => {
  const order = await orderModel.findById(id);
  if (order.isDeleted === true) throw new AppError("Order not found", 404);
  order.isDeleted = true;
  await order.save();
  return order;
};

const cancelOrderService = async (id, userId) => {
  const order = await orderModel.findOne({
    _id: id,
    userId,
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  // if (order.status !== "pending") {
  //   throw new AppError("Only pending orders can be cancelled", 400);
  // }

  // ✅ update status
  order.status = "cancelled";

  await order.save();

  // ✅ restore stock
  for (let item of order.orderItems) {
    await productModel.findByIdAndUpdate(item.productId, {
      $inc: {
        stock: item.quantity,
      },
    });
  }

  // ✅ increase cancel count
  const user = await userModel.findById(userId);

  user.cancelCount += 1;

  // ✅ block user after 3 cancels
  if (user.cancelCount >= 3) {
    user.isBlocked = true;
  }

  await user.save();

  return order;
};
//payment
export const createCheckoutSessionService = async (
  cartId,
  userId,
  url,
  shippingAddress
) => {

  const cart = await cartModel
    .findById(cartId)
    .populate("products.productId");

  // ✅ check cart
  if (!cart) {
    throw new Error("Cart not found");
  }

  // ✅ create stripe session
  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],

    line_items: cart.products.map((item) => ({

      price_data: {

        currency: "egp",

        product_data: {

          name: item.productId.title,

          images: [item.productId.imageCover],
        },

        unit_amount: item.price * 100,
      },

      quantity: item.quantity,
    })),

    mode: "payment",

    // ✅ redirect urls
    success_url: `${url}/allOrders`,

    cancel_url: `${url}/notfound`,

    // ✅ metadata
    metadata: {

      cartId: cart._id.toString(),

      userId: userId.toString(),

      address: JSON.stringify(shippingAddress),

       paymentMethod: "card"
    },

  });

  return session;
};
//عشان بعد عملية الدفع يضيف اوردر اتوماتيك
export const webhookCheckoutService = async (event) => {

  const session = event.data.object;

  const cartId = session.metadata.cartId;

  const userId = session.metadata.userId;

  const shippingAddress = JSON.parse(session.metadata.address);

  // هات الكارت
  const cart = await cartModel
    .findById(cartId)
    .populate("products.productId");

  // اعمل order
  await orderModel.create({

    userId,

    orderItems: cart.products.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.price,
      title: item.productId.title,
      imageCover: item.productId.imageCover,
    })),

    totalOrderPrice: cart.totalPrice,

    shippingAddress,

    paymentMethod: "card",

    status: "paid",

    paidAt: Date.now(),
  });
 await cartModel.findByIdAndDelete(cartId);
 console.log("WEBHOOK HIT");
};
export {
  createOrderService,
  getOrderService,
  updateOrderService,
  deleteOrderService,
  cancelOrderService,
};
