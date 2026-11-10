import express from "express";
import * as reviews from "./review.controller.js";
import { allowTo, protectedRoute } from "../authentication/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { validateAddReview, validateDeleteReview, validateUpdateReview } from "./review.validation.js";
const reviewRoutes = express.Router({mergeParams:true});

reviewRoutes.route("/")
  .post(protectedRoute,validate(validateAddReview),reviews.addReview)
  .get(protectedRoute,reviews.getAllReviews);
reviewRoutes.route("/:id")
 .get(protectedRoute,reviews.getSingleReviews)
 .put(protectedRoute,allowTo("admin","user"),validate(validateUpdateReview),reviews.updateReview)
 .delete(protectedRoute,allowTo("admin","user"),validate(validateDeleteReview),reviews.deleteReview);

export default reviewRoutes;
