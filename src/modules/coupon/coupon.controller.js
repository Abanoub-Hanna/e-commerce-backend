import { catchError } from "../../utilities/catchError.js";
import { AppError } from "../../utilities/AppError.js";
import { createOne, deleteOne, getItems, updateItem } from "../../factorcode/factor.js";
import { couponModel } from "../../../database/models/coupon.model.js";
import { serviceCouponRoute } from "../../services/coupon.services.js";

const createCoupon = catchError(async (req, res, next) => {
    req.body=serviceCouponRoute(req.body);
    let coupon = await createOne(couponModel, req.body);
    res.status(201).json({ message: "success", coupon });
});

const getAllCoupons = getItems(couponModel);

const updateCoupon = updateItem(couponModel,'coupon');

const deleteCoupon = deleteOne(couponModel,'coupon');

export { createCoupon, getAllCoupons, updateCoupon, deleteCoupon };
