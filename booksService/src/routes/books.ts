import { Router } from "express";

import controllers from "@root/controllers";
import fileUpload from "@root/middleware/file";

const booksRouter = Router({ strict: true });
const booksController = controllers.booksController;

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
booksRouter.get(BOOKS_PATHS.API.GET_BOOK, booksController.getBook);

booksRouter.get(BOOKS_PATHS.API.GET_BOOKS, booksController.getBooks);

/** CREATE */
booksRouter.post(BOOKS_PATHS.API.CREATE_BOOK, fileUpload.single("fileBook"), booksController.createBook);

/** UPDATE */
booksRouter.put(BOOKS_PATHS.API.UPDATE_BOOK, booksController.updateBook);

/** DELETE */
booksRouter.delete(BOOKS_PATHS.API.DELETE_BOOK, booksController.deleteBook);

/** DOWNLOAD */
// booksRouter.get(BOOKS_PATHS.API.DOWNLOAD_BOOK, downloadBook);


/* MVC */
/** Create book */
booksRouter.get(BOOKS_PATHS.MVC.CREATE_BOOK, booksController.getCreateBookView);
booksRouter.post(BOOKS_PATHS.MVC.CREATE_BOOK, booksController.createBook);

/** Edit book view*/
booksRouter.get(BOOKS_PATHS.MVC.EDIT_BOOK, booksController.getEditBookView);
booksRouter.post(BOOKS_PATHS.MVC.EDIT_BOOK, booksController.updateBook);

/** Get book  */
booksRouter.get(BOOKS_PATHS.MVC.GET_BOOK, booksController.getBookView);

/** Get all books */
booksRouter.get(BOOKS_PATHS.MVC.GET_BOOKS, booksController.getBooksView);

export default booksRouter;
