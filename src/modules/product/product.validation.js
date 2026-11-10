import Joi from "joi";

const validateAddProduct = Joi.object({
  title: Joi.string().required().min(10).max(100).trim(),
  description: Joi.string().required().min(10).max(500).trim(),
  price: Joi.number().required().positive(),
  priceAfterDiscount: Joi.number().optional().min(0).max(100),
  category: Joi.string().hex().length(24).required(),
  subCategory: Joi.string().hex().length(24).optional(),
  brand: Joi.string().hex().length(24).optional(),
  images: Joi.array().items(Joi.string()),
  imageCover: Joi.string(),
  stock: Joi.number().min(0),
  sold: Joi.number().min(0),
});
const validateGetProduct = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const validateUpdateProduct = Joi.object({
  title: Joi.string().min(10).max(100).trim(),
  description: Joi.string().min(10).max(500).trim(),
  price: Joi.number().positive(),
  priceAfterDiscount: Joi.number().min(0).max(100),
  category: Joi.string().hex().length(24),
  subCategory: Joi.string().hex().length(24),
  brand: Joi.string().hex().length(24),
  images: Joi.array().items(Joi.string()),
  imageCover: Joi.string(),
  id: Joi.string().hex().length(24).required(),
});

const validateDeleteProduct = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export {
  validateAddProduct,
  validateUpdateProduct,
  validateGetProduct,
  validateDeleteProduct,
};
