import { AppError } from "../utilities/AppError.js";


export const serviceCouponRoute=(body)=>{
      const {code, discount, expires} = body;
      if (!code || !discount || !expires) {
        throw new AppError("code, discount and expires are required", 400);
      }
        return body;
}