import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        title: String,
        imageCover: String,
      },
    ],

    totalOrderPrice: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      details: String,
      city: String,
      phone: String,
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    status: {
      type: String,
      enum: ["pending","paid","processing","shipped","delivered","cancelled"],
      default: "pending",
    },

    paidAt: Date,
    deliveredAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
 
  },
  { timestamps: true },
);

export const orderModel = model("Order", orderSchema);
