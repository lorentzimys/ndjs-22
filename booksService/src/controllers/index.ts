import { RequestHandler } from "express";

export const getIndexView: RequestHandler = (req, res) => {
  res.render("index");
};
