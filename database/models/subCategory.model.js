import { Schema, model } from "mongoose";
import slugify from "slugify";

const subCategorySchema = new Schema(
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
    category: {
      type: Schema.ObjectId,
      required: true,
      ref: "category",
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);
subCategorySchema.pre("validate", function () {
  if (this.name) {
    this.slug = slugify(this.name);
  }
});

export const subCategoryModel = model("SubCategory", subCategorySchema);
