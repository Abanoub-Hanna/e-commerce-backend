import Joi from "joi";
import slugify from "slugify";

const validateAddBrand = Joi.object({
  name: Joi.string().required().min(2).trim(),
  logo: Joi.string().optional(),
});
const validateUpdateBrand = Joi.object({
  name: Joi.string().min(2).trim(),
  logo: Joi.string(),
  id: Joi.string().hex().length(24).required(),
});
const validateDeleteBrand = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const validateGetOneBrand = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  validateAddBrand,
  validateUpdateBrand,
  validateDeleteBrand,
  validateGetOneBrand,
};
