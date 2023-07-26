import { RequestHandler } from "express";

const getIndexView: RequestHandler = (req, res) => {
  res.render("index");
};

const indexController = {
  getIndexView,
};

export default indexController;
