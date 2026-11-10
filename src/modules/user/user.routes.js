import express from "express";
import * as users from "./user.controller.js";
import { validate } from "../../middleware/validate.js";
import { validateChangeUserPassword, validateDeleteUser, validateGetUser, validateUpdateUser } from "./user.validation.js";
import productRoutes from "../product/product.routes.js";
import orderRouter from "../order/order.routes.js";
import { allowTo, protectedRoute } from "../authentication/auth.controller.js";

const userRoutes = express.Router();
userRoutes.use('/:userId/products',productRoutes);
userRoutes.use('/:userId/orders',orderRouter);

userRoutes.route("/").
post(protectedRoute,allowTo("admin"),users.addUser).
get(protectedRoute,allowTo("admin"),users.getAllUsers);
userRoutes
  .route("/:id")
  .get(protectedRoute,allowTo("admin"),validate(validateGetUser),users.getUser)
  .put(protectedRoute,allowTo("admin"),validate(validateUpdateUser),users.updateUser)
  .delete(protectedRoute,allowTo("admin"),validate(validateDeleteUser),users.deleteUser)
  .patch(protectedRoute,allowTo("admin","user"),validate(validateChangeUserPassword),users.changeUserPassword)

export default userRoutes;
