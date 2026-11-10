import Joi from "joi";

const validateCreateUser = Joi.object({
  name: Joi.string().required().trim().min(3).max(30),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().min(6).max(128),
});
const validateUpdateUser = Joi.object({
  name: Joi.string().trim().min(3).max(30),
  email: Joi.string().email().trim(),
  password: Joi.string().min(6).max(128),
  id:Joi.string().hex().length(24)
});
const validateGetUser = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const validateDeleteUser = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const validateChangeUserPassword = Joi.object({
  id: Joi.string().hex().length(24).required(),
  password: Joi.string().required().min(6).max(128),
});

export {
  validateCreateUser,
  validateUpdateUser,
  validateGetUser,
  validateDeleteUser,
  validateChangeUserPassword,
};
