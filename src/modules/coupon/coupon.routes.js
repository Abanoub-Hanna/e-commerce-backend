import express from "express";
import * as coupons from "./coupon.controller.js";
import { allowTo, protectedRoute } from "../authentication/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { validateAddCoupon, validateDeleteCoupon, validateUpdateCoupon } from "./coupon.validation.js";
const couponRoutes = express.Router();

couponRoutes.route("/").
post(protectedRoute,allowTo("admin"),validate(validateAddCoupon),coupons.createCoupon)
.get(protectedRoute,allowTo("admin"),coupons.getAllCoupons);
couponRoutes.route("/:id").
put(protectedRoute,allowTo("admin"),validate(validateUpdateCoupon),coupons.updateCoupon)
.delete(protectedRoute,allowTo("admin"),validate(validateDeleteCoupon),  coupons.deleteCoupon);

export default couponRoutes;
