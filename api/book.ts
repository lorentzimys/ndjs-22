import { v4 } from "uuid";

import mockBooks from "@root/api/__mocks__/book.json";
import { Book } from "@root/models/Book";

const uuid = v4;
const dataStore = mockBooks as unknown as Book[] ?? [];

/** Finds book by it's id
 * @param {*} id 
 * @returns 
 */
const findBookById = (id: string | number): Book | undefined  => {
  return dataStore.find((book: Book) => book.id === id);
};

/** [GET] Get all books
 * @param {*} req 
 * @param {*} res 
 */
export const getBooks = (req: any, res: any) => res.status(200).json(mockBooks);

/** [GET] Get book by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getBook = (req: any, res: any) => {
  const { id } = req.params;
  const book = findBookById(id);

  if (!book) {
    return res.status(404).json({
      errmsg: "Book not found",
      errcode: 404,
    });
  }

  res.status(200).json(book);
};

/** [POST] Create a new book
 * @param {*} req 
 * @param {*} res 
 */
export const createBook = (req: any, res: any) => {
  const id = uuid();

  const newBook = new Book({
    ...req.body,
    filebook: req.file?.path || "",
    id,
  });

  dataStore.push(newBook);

  res.status(201).json(newBook);
};

/** [PUT] Update existing book
 * @param {*} req 
 * @param {*} res 
 */
export const updateBook = (req: any, res: any) => {
  const { id } = req.params;

  const bookIdx = dataStore.findIndex(book => book.id == id);
  const book = dataStore[bookIdx];

  if (!book) {
    return res.status(404).json({
      errmsg: "Book not found",
      errcode: 404,
    });
  }

  const updatedBook = new Book({ ...book, ...req.body });

  res.status(200).json(updatedBook);
};

/** [DELETE] Delete book
 * @param {*} req 
 * @param {*} res 
 */
export const deleteBook = (req: any, res: any) => {
  const { id } = req.params;

  const idx = dataStore.findIndex(book => book.id == id);

  if (idx === -1) {
    return res.status(404).json({
      errmsg: "Book not found",
      errcode: 404,
    });
  }

  dataStore.splice(idx, 1);

  res.sendStatus(204);
};

/** [GET] Download book */
export const downloadBook = (req: any, res: any) => {
  const { id } = req.params;

  const book = findBookById(id);

  if (!book) {
    return res.status(404).json({
      errmsg: "Book not found",
      errcode: 404,
    });
  }

  const { fileBook } = book;

  res.download(fileBook);
};
