import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import { serviceUserRoute, signInService } from "../../services/user.services.js";
import jwt from "jsonwebtoken";

const signUp = catchError(async (req, res, next) => {
   let user = await serviceUserRoute(userModel,req.body);
   res.json({ message: "success", user });
});

const signIn = catchError(async (req, res, next) => {
   let token = await signInService(req.body);
   res.json({ message: "success", token });
 
});

const protectedRoute = catchError(async (req, res, next) => {
  let authHeader = req.headers.token;
  if (!authHeader) {
    return next(new AppError("Token not provided", 401));
  }
  
  /* check token exist or not*/
  const { token } = req.headers;
  if (!token) next(new AppError("TOKEN NOT providing"));
  /* verify token هل اتعدل ام لا */ 
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(!decoded) return next(new AppError('invalid signature',401))
    let user = await userModel.findById(decoded.id);
    if (!user) return next(new AppError("user not exist", 404));


  /* update token after change password */
  if (user.passwordChangeAt) {
    let changePasswordDate = parseInt(user.passwordChangeAt.getTime() / 1000);
    if (changePasswordDate > decoded.iat)
      return next(new AppError("Token invalid", 401));
  }
  
  req.userId = user._id;
  req.user=user;
  next();
});
// authorization
const allowTo=(...roles)=>{
  return catchError(async(req,res,next)=>{
    if(!roles.includes(req.user.role))
      return next(new AppError("you are not authorized to access, you are "+ req.user.role , 401))
    next();
  })
}

export { signUp, signIn, protectedRoute,allowTo };
