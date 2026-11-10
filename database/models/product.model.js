import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please enter name"],
      unique: true,
      minlength: [10, "too short product name"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      minlength: 10,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
      default: 0,
    },
    rateCount: {
      type: Number,
      min: 0,
    },
    rateAvg: {
      type: Number,
      min: 1,
      max: 5,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold: {
      type: Number,
      min: 0,
      default: 0,
    },
    category: {
      type: Schema.ObjectId,
      required: true,
      ref: "category",
    },
    subCategory: {
      type: Schema.ObjectId,
      required: true,
      ref: "subCategory",
    },
    brand: {
      type: Schema.ObjectId,
      required: true,
      ref: "brand",
    },
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: "user",
    },
    imageCover: {
      type: String,
    },

    images: {
      type: [String],
    },
  },
  { timestamps: true },
);
//add virtual property
productSchema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});
productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });
// productSchema.post("init", (doc) => {
//   doc.imageCover = `${process.env.BASE_URL}/uploads/product/${doc.imageCover}`;

//   doc.images = doc.images?.map(
//     (img) => `${process.env.BASE_URL}/uploads/product/${img}`,
//   );
// });
productSchema.pre(["find", "findOne"], function () {
  this.populate("reviews", "text");
});

export const productModel = model("product", productSchema);
