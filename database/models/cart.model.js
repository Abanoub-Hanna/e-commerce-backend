import { Schema, model } from "mongoose";
const cartSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    products: [
      {
        productId: {
          type: Schema.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalPriceAfterDiscount: Number,

    coupon: {
      type: Schema.ObjectId,
      ref: "coupon",
    },
  },
  { timestamps: true },
);

// cartSchema.methods.calcTotalPrice = function () {
//   this.totalPrice = this.products.reduce(
//     (total, product) => total + product.price * product.quantity,
//     0,
//   )
// };
cartSchema.pre("save", function () {
      this.totalPrice = this.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
});




export const cartModel = model("cart", cartSchema);
