import { Schema, model } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
      unique: true,
      minlength: 3,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    logo: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true },
);

export const brandModel = model("brand", brandSchema);
