import Joi from "joi";

const validateAddReview = Joi.object({
    text: Joi.string().required(),
    productId: Joi.string().required().hex().length(24),
    rate: Joi.number().min(1).max(5),
});

const validateUpdateReview = Joi.object({
    text: Joi.string(),
    rate: Joi.number().min(1).max(5),
    id:Joi.string().hex().length(24)
});
const validateDeleteReview = Joi.object({
    id: Joi.string().required().hex().length(24),
});
const validateGetReview = Joi.object({
    id: Joi.string().required().hex().length(24),
});
export{
    validateAddReview,
    validateUpdateReview,
    validateDeleteReview,
    validateGetReview
}   