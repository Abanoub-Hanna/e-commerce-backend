import { catchError } from "../../utilities/catchError.js";
import { AppError } from "../../utilities/AppError.js";
import { createOne, deleteOne, getItems, getOne } from "../../factorcode/factor.js";
import { userModel } from "../../../database/models/user.model.js";
import { changePasswordService, serviceUserRoute, updateUserService } from "../../services/user.services.js";


const addUser = catchError(async (req, res, next) => {
  await serviceUserRoute(userModel,req);
  let user=await createOne(userModel,req.body);
  res.status(201).json({ message: "success", user });
});

const updateUser = catchError(async (req, res, next) => {
  let newUser = await updateUserService(req.params.id,req.body);
  res.status(201).json({ message: "success", newUser });
});
const changeUserPassword = catchError(async (req, res, next) => {
 let user =await changePasswordService(req.params.id,req.body);
  res.status(201).json({ message: "success", user });
});

const getAllUsers = getItems(userModel);

const getUser = getOne(userModel,"user");

const deleteUser = deleteOne(userModel, "user");

export { addUser, getAllUsers, updateUser, deleteUser, getUser,changeUserPassword };
