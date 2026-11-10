import { userModel } from "../../database/models/user.model.js";
import { AppError } from "../utilities/AppError.js";
import { catchError } from "../utilities/catchError.js";

const checkBlocked = catchError(async (req, res, next) => {
  const user = await userModel.findById(req.userId);

  if (user.isBlocked)
    return next(
      new AppError("Your account is blocked. Please contact support.", 403),
    );
  next();
});

export default checkBlocked;
