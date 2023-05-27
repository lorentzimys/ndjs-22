import { Router } from "express";

import {
  deleteBook,
  downloadBook,
  getBooksView,
  getEditBookView,
  getCreateBookView,
  getBookView,
  createBook,
  updateBook
} from "@root/controllers/books";

import fileUpload from "@root/middleware/file";
import { PATHS } from "@root/routes";

export const booksRouter = Router();

/** Get all books */
booksRouter.get(PATHS.getBooks, getBooksView);

/** Create book routes*/
booksRouter.get(PATHS.createBook, getCreateBookView);

booksRouter.post(PATHS.createBook, fileUpload.single("fileBook"), createBook);
/** Get book by id */
booksRouter.get(PATHS.getBook, getBookView);


/** Update book routes*/
booksRouter.get(PATHS.editBook, getEditBookView);

booksRouter.post(PATHS.editBook, updateBook);

/** Delete book */
booksRouter.delete(PATHS.deleteBook, deleteBook);

/** Download book */
booksRouter.get(PATHS.downloadBook, downloadBook);
