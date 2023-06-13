import { Router } from "express";

import { getIndexView } from "@root/controllers";

export const indexRouter: Router = Router();

indexRouter.get("/", getIndexView);

indexRouter.get("/404", (res, req) => req.render("./404"));
