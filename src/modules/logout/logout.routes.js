import express from "express";
import { protectedRoute } from "../authentication/auth.controller.js";
import { logoutController } from "./logout.controller.js";
const logoutRouter = express.Router();

logoutRouter.post("/", protectedRoute, logoutController);

export default logoutRouter;
