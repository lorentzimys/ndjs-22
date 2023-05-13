const API_PATH = '/api';

module.exports = {
  login: `${API_PATH}/user/login`,
  getBooks: `${API_PATH}/books`,
  getBook: `${API_PATH}/books/:id`,
  createBook: `${API_PATH}/books`,
  updateBook: `${API_PATH}/books/:id`,
  deleteBook: `${API_PATH}/books/:id`,
}