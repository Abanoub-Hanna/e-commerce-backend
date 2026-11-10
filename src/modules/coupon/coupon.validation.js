import Joi from "joi";

const validateAddCoupon=Joi.object({
    code:Joi.string().required(),
    discount:Joi.number().required(),
    expires:Joi.date().required(),
})

const validateUpdateCoupon=Joi.object({
    code:Joi.string().optional(),
    discount:Joi.number().optional(),
    expires:Joi.date().optional(),
    id:Joi.string().required()
})
const validateDeleteCoupon=Joi.object({
    id:Joi.string().required()
})

export {validateAddCoupon,validateUpdateCoupon,validateDeleteCoupon}