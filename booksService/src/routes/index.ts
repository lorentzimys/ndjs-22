import { Router } from "express";

import { getIndexView } from "@root/controllers";

export const PATHS = {
  login: "/user/login",
  getBooks: "/books",
  createBook: "/books/create",
  getBook: "/books/:id",
  editBook: "/books/:id/edit",
  deleteBook: "/books/:id",
  downloadBook: "/books/:id/download",
};

export const indexRouter: Router = Router();

indexRouter.get("/", getIndexView);

indexRouter.get("/404", (res, req) => req.render("./404"));
