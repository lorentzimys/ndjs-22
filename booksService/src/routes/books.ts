import { Router } from "express";

import {
  deleteBook,
  getBooksView,
  getEditBookView,
  getCreateBookView,
  getBookView,
  createBook,
  updateBook,
  getBook,
  getBooks
} from "@root/controllers/books";

import fileUpload from "@root/middleware/file";

export const booksRouter = Router({ strict: true });

export const BOOKS_PATHS = {
  API: {
    DOWNLOAD_BOOK: "/api/books/:id/download",
    GET_BOOK: "/api/books/:id",
    
    GET_BOOKS: "/api/books",
    CREATE_BOOK: "/api/books",
    UPDATE_BOOK: "/api/books/:id",
    DELETE_BOOK: "/api/books/:id",
  },
  MVC: {
    GET_BOOKS: "/books",
    GET_BOOK: "/books/:id",
    EDIT_BOOK: "/books/:id/edit",
    CREATE_BOOK: "/books/create",
  },
};

/** READ */
booksRouter.get(BOOKS_PATHS.API.GET_BOOK, getBook);
booksRouter.get(BOOKS_PATHS.API.GET_BOOKS, getBooks);

/** CREATE */
booksRouter.post(BOOKS_PATHS.API.CREATE_BOOK, fileUpload.single("fileBook"), createBook);

/** UPDATE */
booksRouter.put(BOOKS_PATHS.API.UPDATE_BOOK, updateBook);

/** DELETE */
booksRouter.delete(BOOKS_PATHS.API.DELETE_BOOK, deleteBook);

/** DOWNLOAD */
// booksRouter.get(BOOKS_PATHS.API.DOWNLOAD_BOOK, downloadBook);


/* MVC */
/** Create book */
booksRouter.get(BOOKS_PATHS.MVC.CREATE_BOOK, getCreateBookView);

/** Edit book view*/
booksRouter.get(BOOKS_PATHS.MVC.EDIT_BOOK, getEditBookView);
booksRouter.post(BOOKS_PATHS.MVC.EDIT_BOOK, updateBook);

/** Get book  */
booksRouter.get(BOOKS_PATHS.MVC.GET_BOOK, getBookView);

/** Get all books */
booksRouter.get(BOOKS_PATHS.MVC.GET_BOOKS, getBooksView);
