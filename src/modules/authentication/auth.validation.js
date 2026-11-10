import joi from "joi"

const signUpValidate=joi.object({
    name:joi.string().required().min(2).trim(),
    email:joi.string().email().required().trim(),
    password:joi.string().min(6).required().trim(),
    role:joi.string().valid("admin","user")
})
const signInValidate=joi.object({
    email:joi.string().email().required().trim(),
    password:joi.string().min(6).required().trim(),
})

export {signUpValidate,signInValidate}