import { Schema, model } from "mongoose";

const couponSchema = new Schema(
  {
    discount: {
      type:Number,
      min: 0,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const couponModel = model("coupon", couponSchema);
