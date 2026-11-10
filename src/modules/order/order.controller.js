import { orderModel } from "../../../database/models/order.model.js";
import { catchError } from "../../utilities/catchError.js";
import { getItems } from "../../factorcode/factor.js";
import { cancelOrderService, createOrderService,
   deleteOrderService, getOrderService,
    updateOrderService,createCheckoutSessionService, 
    webhookCheckoutService} from "../../services/order.services.js";
import { ApiFeatures } from "../../utilities/ApiFeatures.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const createOrder = catchError(async (req, res, next) => {
  let order=await createOrderService(req.user._id,req.body.shippingAddress)
  res.status(201).json({ message: "success", order });
});
const getUserOrders = catchError(async (req,res,next) => {
  let filter = {};
  if (req.user.role !== "admin") {
    filter.userId = req.user._id;
  }

  let apiFeatures = new ApiFeatures(orderModel.find(filter), req.query)
    .filter()
    .sort()
    .selectFields()
    .paginate()
    .search();

  apiFeatures.mongooseQuery =
    apiFeatures.mongooseQuery.populate(
      "orderItems.productId",
      "title imageCover price priceAfterDiscount"
    );

  let results = await apiFeatures.mongooseQuery;

  let page = apiFeatures.queryString.page || 1;

  res.json({page,message: "success",results});

});

const getSingleOrder = catchError(async (req, res, next) => {
  const order=await getOrderService(req.params.id,req.user)
  res.status(200).json({ message: "success", order });

});

const updateOrder = catchError(async (req, res, next) => {
  let order=await updateOrderService(req.params.id,req.body.status)
  res.status(200).json({ message: "success", order });
});

//soft delete
const deleteOrder = catchError(async (req, res, next) => {
    let order=await deleteOrderService(req.params.id);
    res.json({ message: "success" , order });
  });

const cancelOrder = catchError(async (req, res,next) => {
  let order = await cancelOrderService(req.params.id,req.user._id)
  res.status(200).json({ message: "success",order });
});

// payment
const createCheckoutSession = catchError(async (req, res, next) => {

  const session = await createCheckoutSessionService(req.params.cartId,
    req.user._id,req.body.url,
    req.body.shippingAddress
  );

  res.status(200).json({message: "success",session});

});

const webhookCheckout = async (req, res) => {

  try {

    console.log("WEBHOOK HIT");

    const sig = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET
    );

    console.log(event.type);

    if (event.type === "checkout.session.completed") {

      console.log("PAYMENT SUCCESS");

      await webhookCheckoutService(event);

      console.log("ORDER CREATED");
    }

    res.json({ received: true });

  } catch (error) {

    console.log(error);

    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

export { 
  createOrder,
  getUserOrders,
  getSingleOrder,
  updateOrder ,
  deleteOrder,
  cancelOrder,
  createCheckoutSession,
  webhookCheckout
};