import { Router } from "express";

import passport from "passport";
import UserController from "@root/controllers/user";

export const LOGIN_PATHS = {
  USER_PAGE: "/me",
  LOGIN_PAGE: "/login",
  SIGNUP: "/api/user/signup",
  LOGIN: "/login",
};

const userRouter = Router();

/** Login page */
userRouter.get(LOGIN_PATHS.LOGIN_PAGE, (req, res) => res.render("./login"));

/** Login action*/
userRouter.post(
  LOGIN_PATHS.LOGIN,
  passport.authenticate("local", {
    successRedirect: LOGIN_PATHS.USER_PAGE,
    failureRedirect: LOGIN_PATHS.LOGIN_PAGE,
  })
);

/** User profile page */
userRouter.get(LOGIN_PATHS.USER_PAGE, (req, res) => {
  res.render("./user/profile", { user: req.user });
});

/** Signup action */
userRouter.post(LOGIN_PATHS.SIGNUP, UserController.signup);

export default userRouter;
