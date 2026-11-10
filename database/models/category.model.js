import { Schema, model } from "mongoose";

const categorySchema = new Schema(
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
      required: true,
      trim: true,
    },
    image:{
      type:String,
    },
  },
  { timestamps: true },
);
// categorySchema.post('init', (doc) => {
//    if (doc.image) {
//      doc.image = `${process.env.BASE_URL}/uploads/category/${doc.image}`;
//    }
// });
export const categoryModel = model("category", categorySchema);

