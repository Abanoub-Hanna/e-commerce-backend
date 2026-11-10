import express from "express";
let authRouter = express.Router();
import * as auth from "./auth.controller.js";
import { signInValidate, signUpValidate } from "./auth.validation.js";
import { validate } from "../../middleware/validate.js";

authRouter.post("/signup", validate(signUpValidate), auth.signUp);
authRouter.post("/signin", validate(signInValidate), auth.signIn);

export default authRouter;
