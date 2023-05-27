const API_PATH = "/api";

export const PATHS = {
  login: `${API_PATH}/user/login`,
  getBooks: `${API_PATH}/books`,
  getBook: `${API_PATH}/books/:id`,
  createBook: `${API_PATH}/books`,
  updateBook: `${API_PATH}/books/:id`,
  deleteBook: `${API_PATH}/books/:id`,
  downloadBook: `${API_PATH}/books/:id/download`,
};
