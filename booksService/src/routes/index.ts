import { Router } from "express";

import controllers from "@root/controllers";

import booksRouter from "./books";
import userRouter from "./user";

export const indexRouter: Router = Router();

indexRouter.get("/", controllers.indexController.getIndexView);
indexRouter.get("/404", (res, req) => req.render("./404"));

const routes: Record<string, Router> = {
  booksRouter,
  userRouter,
  indexRouter,
};

export default routes;