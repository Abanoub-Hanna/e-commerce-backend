import jwt from "jsonwebtoken";
import { userModel } from "../../database/models/user.model.js";
import { AppError } from "../utilities/AppError.js";
import bcrypt from "bcrypt";

const serviceUserRoute = async (model, body) => {
  let isUser = await model.findOne({ email: body.email });
  if (isUser) throw new AppError("email already exist", 409);
  const user = new userModel(body);
  await user.save();
  return user;
};
const signInService = async (body) => {
  const { email, password } = body;
  let user = await userModel.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    let token = jwt.sign({ name: user.name, email: user.email, id: user._id, role: user.role },
      process.env.SECRET_KEY,
    );
    return token
  }else{
    throw new AppError("error in email or password ",404)
  }

};
const updateUserService = async (id, body) => {
  const { name, email, role } = body;
  if (body.password) throw new AppError("you can't change password here", 400);
  let newUser = await userModel.findByIdAndUpdate(
    id,
    { name, email, role },
    { new: true },
  );
  if (!newUser) throw new AppError("user not found", 404);
  await newUser.save();
  return newUser;
};
const changePasswordService = async (id, body) => {
  body.passwordChangeAt = Date.now();
  let user = await userModel.findByIdAndUpdate(
    id,
    { password: body.password, passwordChangeAt: body.passwordChangeAt },
    { new: true },
  );
  if (!user) throw new AppError("user not found", 404);
  await user.save();
  return user;
};
export {
  serviceUserRoute,
  updateUserService,
  changePasswordService,
  signInService,
};
