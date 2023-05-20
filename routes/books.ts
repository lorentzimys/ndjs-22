import { Router } from "express";

import { getBooks, getBook, createBook, updateBook, deleteBook, downloadBook } from "@root/api/book";

import fileUpload from "@root/middleware/file";
import { PATHS } from "@root/routes";

export const booksRouter = Router();
/**
 * Books REST-API
 */

booksRouter.get(PATHS.getBooks, getBooks);
booksRouter.get(PATHS.getBook, getBook);
booksRouter.post(PATHS.createBook, fileUpload.single("fileBook"), createBook);
booksRouter.put(PATHS.updateBook, updateBook);
booksRouter.delete(PATHS.deleteBook, deleteBook);
booksRouter.get(PATHS.downloadBook, downloadBook);

module.exports = {
  booksRouter
};