import { Router } from "express";

import userController from "@root/controllers/user";

export const LOGIN_PATHS = {
  ME: "/api/user/me",
  GET_LOGIN: "/api/user/login",
  SIGNUP: "/api/user/signup",
  LOGIN: "/api/user/login",
};

const userRouter = Router();

/** Login page */
// userRouter.get(LOGIN_PATHS.GET_LOGIN, login);

/** User profile page */
// userRouter.get(LOGIN_PATHS.ME, login);

/** Login action*/
userRouter.post(LOGIN_PATHS.LOGIN, userController.login);

/** Signup action */
userRouter.post(LOGIN_PATHS.SIGNUP, userController.signup);

export default userRouter;
