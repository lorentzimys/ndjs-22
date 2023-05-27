import { Router } from "express";

import { getBooks, getBook, createBook, updateBook, deleteBook, downloadBook } from "@root/api/book";

import fileUpload from "@root/middleware/file";
import { PATHS } from "@root/routes";

export const booksRouter = Router();
/**
 * Books REST-API
 */


/** Get all books */
booksRouter.get(PATHS.getBooks, getBooks);

/** Get book by id */
booksRouter.get(PATHS.getBook, getBook);

/** Create book */
booksRouter.post(PATHS.createBook, fileUpload.single("fileBook"), createBook);

/** Update book */
booksRouter.put(PATHS.updateBook, updateBook);

/** Delete book */
booksRouter.delete(PATHS.deleteBook, deleteBook);

/** Download book */
booksRouter.get(PATHS.downloadBook, downloadBook);
