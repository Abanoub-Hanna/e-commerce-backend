import { catchError } from "../../utilities/catchError.js";
import { reviewModel } from "../../../database/models/review.model.js";
import { createOne, deleteOne, getItems, getOne, updateItem } from "../../factorcode/factor.js";
import { serviceReviewRoute } from "../../services/review.services.js";

const addReview = catchError(async (req, res, next) => {
   await serviceReviewRoute(req, reviewModel);
  let review=await createOne(reviewModel,req.body);
  res.status(201).json({ message: "success", review });
});

const getAllReviews =getItems(reviewModel,"productId");

const getSingleReviews = getOne(reviewModel,"review");

const updateReview = updateItem(reviewModel,"review");

const deleteReview = deleteOne(reviewModel,"review");

export { addReview, getAllReviews, getSingleReviews, updateReview, deleteReview };
