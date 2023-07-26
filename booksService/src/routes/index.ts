import { Router } from "express";

import IndexController from "@root/controllers/index";

export const indexRouter: Router = Router();

indexRouter.get("/", IndexController.getIndexView);
indexRouter.get("/404", (res, req) => req.render("./404"));

export default indexRouter;