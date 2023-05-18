const express = require('express');

const { PORT } = require('./config');
const routes = require('./routes');

const { 
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('./api/book');

const { login } = require('./api/user');

/**
 * APP INIT
*/

const app = express(PORT);

app.use(
  express.urlencoded({ extended: true })
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


/**
 * User REST-API
 */

app.post(routes.login, login);

/**
 * Books REST-API
 */

app.get(routes.getBooks, getBooks);

app.get(routes.getBook, getBook);

app.post(routes.createBook, createBook);

app.put(routes.updateBook, updateBook);

app.delete(routes.deleteBook, deleteBook);

