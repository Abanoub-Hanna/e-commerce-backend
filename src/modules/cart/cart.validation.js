import joi from 'joi';

const validateAddToCart = joi.object({
    productId: joi.string().required().hex().length(24),
});

const validateGetCart = joi.object({
   productId:joi.string().hex().length(24),
});

const validateUpdateCart = joi.object({
    productId: joi.string().required().hex().length(24),
    quantity:joi.number().default(1) 
});
const validateRemoveFromCart = joi.object({
    productId: joi.string().required().hex().length(24),
});

export {
    validateAddToCart,
    validateGetCart,
    validateUpdateCart,
    validateRemoveFromCart
};