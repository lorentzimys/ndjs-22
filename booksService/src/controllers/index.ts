import { RequestHandler } from "express";
import userController from "./user";
import booksController from "./books";

const getIndexView: RequestHandler = (req, res) => {
  res.render("index");
};

const indexController = {
  getIndexView,
};

export default {
  indexController,
  userController,
  booksController,
};
