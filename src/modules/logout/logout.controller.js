import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../utilities/catchError.js";

export const logoutController = catchError(async (req, res, next) => {
  await userModel.findByIdAndUpdate(req.userId, {passwordChangeAt: Date.now(),});

  res.status(200).json({
    message: "Logged out successfully",
  });
});
