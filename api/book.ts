import { v4 } from "uuid";

import mockBooks from "@root/api/__mocks__/book.json";
import { Book } from "@root/models/Book";
import { RequestHandler } from "express";

const uuid = v4;
const dataStore = mockBooks as unknown as Book[] ?? [];

/** Finds book by it's id
 * @param {*} id 
 * @returns 
 */
const findBookById = (id: string | number): Book | undefined  => {
  return dataStore.find((book: Book) => book.id == id);
};

/** 
 * Returns 404 error
 */
export const getNotFoundError = (res: any) => res.status(404).json({
  errmsg: "Book not found",
  errcode: 404,
});

/** [GET] Get all books
 * @param {*} req 
 * @param {*} res 
 */
export const getBooks: RequestHandler = (req, res) => res.status(200).json(dataStore);

/** [GET] Get book by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getBook: RequestHandler = (req, res) => {
  const { id } = req.params;
  const book = findBookById(id);

  if (!book) {
    return getNotFoundError(res);
  }

  res.status(200).json(book);
};

/** [POST] Create a new book
 * @param {*} req 
 * @param {*} res 
 */
export const createBook: RequestHandler = (req, res) => {
  const id = uuid();

  const newBook = new Book({
    fileName: req.file?.filename,
    ...req.body,
    fileBook: req.file?.path ?? "",
    id,
  });

  dataStore.push(newBook);

  res.status(201).json(newBook);
};

/** [PUT] Update existing book
 * @param {*} req 
 * @param {*} res 
 */
export const updateBook: RequestHandler = (req, res) => {
  const { id } = req.params;

  const bookIdx = dataStore.findIndex(book => book.id == id);
  const book = dataStore[bookIdx];

  if (!book) {
    return getNotFoundError(res);
  }

  const updatedBook = new Book({ ...book, ...req.body });

  res.status(200).json(updatedBook);
};

/** [DELETE] Delete book
 * @param {*} req 
 * @param {*} res 
 */
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
