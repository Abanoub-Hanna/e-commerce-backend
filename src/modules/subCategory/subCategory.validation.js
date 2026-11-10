import Joi from "joi";

const validateAddSubCategory =Joi.object({
    name:Joi.string().required(),
    category:Joi.string().required().hex().length(24),
    createdBy:Joi.string().hex().length(24).required()
})
const validateUpdateSubCategory =Joi.object({
    name:Joi.string(),
    category:Joi.string().hex().length(24),
    createdBy:Joi.string().hex().length(24),
    id:Joi.string().hex().length(24),
   
})
const validateGetOneSubCategory =Joi.object({
    id:Joi.string().hex().length(24).required()
})
const validateDeleteSubCategory =Joi.object({
    id:Joi.string().hex().length(24).required()
})

export {
    validateAddSubCategory,
    validateUpdateSubCategory,
    validateGetOneSubCategory,
    validateDeleteSubCategory
}
    