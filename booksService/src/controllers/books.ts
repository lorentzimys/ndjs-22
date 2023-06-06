import { RequestHandler } from "express";
import http from "http";
import { v4 } from "uuid";

import mockBooks from "@root/mock/book.json";
import { Book } from "@root/models/Book";
import { COUNTER_SERVICE_HOST, COUNTER_SERVICE_PORT } from "@root/config";

const uuid = v4;
const dataStore = mockBooks as unknown as Book[] ?? [];

/** Finds book by it's id
 * @param {*} id 
 * @returns 
 */
const findBookById = (id: string | number): Book | undefined  => {
  return dataStore.find((book: Book) => book.id == id);
};

/** Gets book counter by bookId from booksCounterService */
const getBookCounter = (bookId: string): Promise<{ viewsCount: number | null }> => {
  return new Promise((resolve) => {
    try {
      // http.get(`http://${COUNTER_SERVICE_HOST}:${COUNTER_SERVICE_PORT}/counter/${bookId}`, (res) => {

      http.get({
        host: COUNTER_SERVICE_HOST,
        port: COUNTER_SERVICE_PORT,
        path: `/counter/${bookId}`,
      }, (res) => {
        let data = "";
    
        res.on("data", (chunk: any) => {
          data += chunk;
        });
      
        res.on("end", () => {
          const result = JSON.parse(data);
          
          resolve(result);
        });
      });
    } catch (err) {
      const defaultResult = { viewsCount: null };
      resolve(defaultResult);
    }
  });
};

/** Sends request to booksCounterService to increment book counter */
const incrementBookCounter = (bookId: string): Promise<void> => {
  return new Promise((resolve) => {
    const req = http.request({
      host: COUNTER_SERVICE_HOST,
      port: COUNTER_SERVICE_PORT,
      path: `/counter/${bookId}/incr`,
      method: "POST",
    });

    req.on("error", () => resolve());

    req.end(() => resolve());
  });
};

/*** Returns 404 error */
export const getNotFoundError = (res: any) => res.status(404).json({
  errmsg: "Book not found",
  errcode: 404,
});

/** [GET] Get all books */
export const getBooks: RequestHandler = (req, res) => res.status(200).json(dataStore);

/** [GET] Get book by id */
export const getBook: RequestHandler = (req, res) => {
  const { id } = req.params;
  const book = findBookById(id);

  if (!book) {
    return getNotFoundError(res);
  }

  res.status(200).json(book);
};

/** [POST] Create book */
export const createBook: RequestHandler = (req, res) => {
  const id = uuid();

  const newBook = new Book({
    fileName: req.file?.filename,
    ...req.body,
    fileBook: req.file?.path ?? "",
    id,
  });

  dataStore.push(newBook);

  res.redirect(`/books/${id}`);
};

/** [PUT] Update book */
export const updateBook: RequestHandler = (req, res) => {
  const { id } = req.params;

  const bookIdx = dataStore.findIndex(book => book.id == id);
  const book = dataStore[bookIdx];

  if (!book) {
    return getNotFoundError(res);
  }

  const updatedBook = new Book({ ...book, ...req.body });

  dataStore[bookIdx] = updatedBook;

  res.redirect(`/books/${id}`);
};

/** [DELETE] Delete book */
export const deleteBook: RequestHandler = (req, res) => {
  const { id } = req.params;

  const idx = dataStore.findIndex(book => book.id == id);

  if (idx === -1) {
    return getNotFoundError(res);
  }

  dataStore.splice(idx, 1);

  res.sendStatus(204);
};

/** [GET] Download book */
export const downloadBook: RequestHandler = (req, res) => {
  const { id } = req.params;

  const book = findBookById(id);

  if (!book) {
    return getNotFoundError(res);
  }

  const { fileBook, fileName } = book;

  res.download(fileBook, fileName);
};


/** Rendering methods */
export const getBooksView: RequestHandler = (req, res) => {
  res.render("./books/index", { 
    books: dataStore,
    title: "Книги",
  });
};

export const getBookView: RequestHandler = async (req, res) => {
  const { id } = req.params;
  
  const book = findBookById(id);
  
  if (!book) {
    return res.redirect("/404");
  }
  
  try {
    await incrementBookCounter(id);

    const { viewsCount } = await getBookCounter(id);

    res.render("./books/view", {
      book,
      viewsCount,
    });

  } catch (err) {
    console.error(err);

    res.render("./books/view", { book });
  }
};

export const getEditBookView: RequestHandler = (req, res) => {
  const { id } = req.params;

  const book = findBookById(id);

  if (!book) {
    return res.redirect("/404");
  }

  res.render("./books/edit", { book });
};

export const getCreateBookView: RequestHandler = (req, res) => {
  res.render("./books/create", { book: {} });
};
