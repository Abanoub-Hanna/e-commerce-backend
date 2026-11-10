import express from "express";
import * as orders from "./order.controller.js";
import { validate } from "../../middleware/validate.js";
import checkBlocked from "../../middleware/checkuserblocked.js";
import { allowTo, protectedRoute } from "../authentication/auth.controller.js";
import { validateCancelOrder, validateCreateOrder, validateDeleteOrder, validateGetOrder, validateUpdateOrder } from "./order.validation.js";

const orderRouter = express.Router({mergeParams:true});

orderRouter.route("/").
post(protectedRoute,checkBlocked,validate(validateCreateOrder),orders.createOrder)
.get(protectedRoute,allowTo("admin","user"),orders.getUserOrders);
orderRouter.route("/:id").
get(protectedRoute,allowTo("admin","user"),validate(validateGetOrder),orders.getSingleOrder)
.put(protectedRoute,validate(validateUpdateOrder),orders.updateOrder)
.delete(protectedRoute,allowTo("admin"),validate(validateDeleteOrder),orders.deleteOrder)
.patch(protectedRoute,validate(validateCancelOrder),orders.cancelOrder)    
orderRouter.post("/:cartId/checkout-session",protectedRoute,
  orders.createCheckoutSession
);
orderRouter.post("/webhook",orders.webhookCheckout);

export default orderRouter;