import { RequestHandler } from "express";

export const THEME: "light" | "dark" = "light";

export const getIndexView: RequestHandler = (req, res) => {
  res.render("index");
};
