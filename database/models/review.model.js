import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: Schema.ObjectId,
      ref: "product",
      required: true,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);

reviewSchema.pre(/^find/,function () {
    this.populate("userId","name")
    .populate("productId", "title");
})

export const reviewModel = model("review", reviewSchema);
