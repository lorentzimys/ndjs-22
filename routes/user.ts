import { Router } from "express";

import { PATHS } from "@root/routes";
import { login } from "@root/api/user";

export const userRouter = Router();

/**
 * User REST-API
 */

userRouter.post(PATHS.login, login);
