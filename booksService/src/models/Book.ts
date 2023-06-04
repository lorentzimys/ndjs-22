/**
 * @class Book
 * @description Класс книги
 */
export class Book {
  id: string | number;
  title: string;
  description: string;
  authors: string[];
  favorite: boolean;
  fileCover: string;
  fileName: string;
  fileBook: string;

  constructor(opts: Book) {
      const {
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
      } = opts;

      this.id = id;
      this.title = title;
      this.description = description;
      this.authors = authors;
      this.favorite = favorite;
      this.fileCover = fileCover;
      this.fileName = fileName;
      this.fileBook = fileBook;

      return this;
  }
}
