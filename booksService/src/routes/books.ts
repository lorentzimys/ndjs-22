import { Router } from "express";

import BooksController from "@root/controllers/books";
import fileUpload from "@root/middleware/file";
import { iocContainer } from "@root/ioc-container";
import { BooksRepository } from "@root/BooksRepository";

const booksRouter = Router({ strict: true });

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
booksRouter.get(BOOKS_PATHS.API.GET_BOOK, BooksController.getBook);

booksRouter.get(BOOKS_PATHS.API.GET_BOOKS, BooksController.getBooks);

/** CREATE */
booksRouter.post(BOOKS_PATHS.API.CREATE_BOOK, fileUpload.single("fileBook"), BooksController.createBook);

/** UPDATE */
booksRouter.put(BOOKS_PATHS.API.UPDATE_BOOK, BooksController.updateBook);

/** DELETE */
booksRouter.delete(BOOKS_PATHS.API.DELETE_BOOK, BooksController.deleteBook);

/** DOWNLOAD */
// booksRouter.get(BOOKS_PATHS.API.DOWNLOAD_BOOK, downloadBook);


/* MVC */
/** Create book */
booksRouter.get(BOOKS_PATHS.MVC.CREATE_BOOK, BooksController.getCreateBookView);
booksRouter.post(BOOKS_PATHS.MVC.CREATE_BOOK, BooksController.createBook);

/** Edit book view*/
booksRouter.get(BOOKS_PATHS.MVC.EDIT_BOOK, BooksController.getEditBookView);
booksRouter.post(BOOKS_PATHS.MVC.EDIT_BOOK, BooksController.updateBook);

/** Get book  */
// booksRouter.get(BOOKS_PATHS.MVC.GET_BOOK, BooksController.getBookView);
booksRouter.get(BOOKS_PATHS.MVC.GET_BOOK, async (req, res, next) => {
  const repo = iocContainer.get(BooksRepository);
  const book = await repo.getBook(req.params.id);

  res.json(book);
});

/** Get all books */
booksRouter.get(BOOKS_PATHS.MVC.GET_BOOKS, BooksController.getBooksView);

export default booksRouter;
