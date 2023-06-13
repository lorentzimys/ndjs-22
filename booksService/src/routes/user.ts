import { Router } from "express";

import { login } from "@root/controllers/user";

export const LOGIN_PATHS = {
  LOGIN: "/user/login",
};

export const userRouter = Router();

/** Login */
userRouter.post(LOGIN_PATHS.LOGIN, login);
