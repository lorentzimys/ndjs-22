/**
 * @class Book
 * @description Класс книги
 */
class Book {
  constructor(opts) {
      const { id, title, description, authors, favorite, fileCover, fileName } = opts;

      this.id = id;
      this.title = title;
      this.description = description;
      this.authors = authors;
      this.favorite = favorite;
      this.fileCover = fileCover;
      this.fileName = fileName;

      return this;
  }
}

module.exports = { Book };