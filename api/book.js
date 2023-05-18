const { mockBooks } = require('./__mocks__/book');
const { Book } = require('../models/Book');
const uuid = require('uuid').v4;

/** Finds book by it's id
 * @param {*} id 
 * @returns 
 */
const findBookById = id => mockBooks.find(book => book.id == id);

/** [GET] Get all books
 * @param {*} req 
 * @param {*} res 
 */
const getBooks = (req, res) => res.status(200).json(mockBooks);

/** [GET] Get book by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getBook = (req, res) => {
  const { id } = req.params;
  const book = findBookById(id);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  res.status(200).json(book);
}

/** [POST] Create a new book
 * @param {*} req 
 * @param {*} res 
 */
const createBook = (req, res) => {
  const id = uuid();

  const newBook = new Book({ ...req.body, id });

  mockBooks.push(newBook);

  res.status(201).json(newBook);
}

/** [PUT] Update existing book
 * @param {*} req 
 * @param {*} res 
 */
const updateBook = (req, res) => {
  const { id } = req.params;

  const bookIdx = mockBooks.findIndex(book => book.id == id);
  const book = mockBooks[bookIdx];

  if (!book) {
    return res.status(404).send('Book not found');
  }

  const updatedBook = new Book({ ...book, ...req.body });

  res.status(200).json(updatedBook);
}

/** [DELETE] Delete book
 * @param {*} req 
 * @param {*} res 
 */
const deleteBook = (req, res) => {
  const { id } = req.params;

  const idx = mockBooks.findIndex(book => book.id == id);

  if (idx === -1) {
    return res.status(404).send('Book not found');
  }

  mockBooks.splice(idx, 1);

  res.sendStatus(204);
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
}