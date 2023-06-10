import { Router } from "express";

import { PATHS } from "@root/routes";
import { login } from "@root/controllers/user";

export const userRouter = Router();

/**
 * User REST-API
 */


/** Login */
userRouter.post(PATHS.login, login);
