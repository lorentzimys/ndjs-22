import { Router } from "express";

import { getIndexView } from "@root/controllers";
import booksRouter from "./books";
import userRouter from "./user";

export const indexRouter: Router = Router();

indexRouter.get("/", getIndexView);
indexRouter.get("/404", (res, req) => req.render("./404"));

const routes: Record<string, Router> = {
  indexRouter,
  booksRouter,
  userRouter,
};

export default routes;