import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "enter your password"],
      minlength: 6,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    cancelCount: {
      type: Number,
      default: 0,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
// mongoose middleware
userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});
// hash password when update
userSchema.pre("findOneAndUpdate", function () {
  if (this._update.password) {
    this._update.password = bcrypt.hashSync(this._update.password, 8);
  }
});

export const userModel = model("user", userSchema);
