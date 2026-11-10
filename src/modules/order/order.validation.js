import Joi from "joi";

const validateCreateOrder = Joi.object({
 shippingAddress: Joi.object({
    details: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().required(),
  }).required(),
  paymentMethod: Joi.string().valid("cash", "card"),
});

const validateGetOrder = Joi.object({
  id: Joi.string().required().hex().length(24),
});

const validateUpdateOrder = Joi.object({
  id: Joi.string().required().hex().length(24),
  status: Joi.string().valid("pending", "paid", "shipped", "delivered", "cancelled")
});

const validateDeleteOrder = Joi.object({
  id: Joi.string().required().hex().length(24),
});

const validateCancelOrder = Joi.object({
  id: Joi.string().required().hex().length(24),
  status: Joi.string().required()
});

export {
  validateCreateOrder,
  validateGetOrder,
  validateUpdateOrder,
  validateDeleteOrder,
  validateCancelOrder,
};
