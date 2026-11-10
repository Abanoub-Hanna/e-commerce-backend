import { AppError } from "../utilities/AppError.js";



export const serviceReviewRoute=async(req,model)=>{

      req.body.userId = req.user._id;
      let isReview = await model.findOne({ userId: req.user._id, productId: req.body.productId });
      if (isReview) {
        throw new AppError("you already added a review for this product", 409);
      }
      return req.body;
    }