import { RequestHandler } from "express";
import { BookModel } from "@root/models/Book";
import { COUNTER_SERVICE_URL } from "@root/config";

interface BookCounter {
  viewsCount: number | null;
}

/** Finds book by it's id */
const findBookById = async (id: string | number) => {
  try {
    const book = await BookModel.findById(id);

    console.log("book", book);

    return book;
  } catch (err) {
    console.log(err);
  }
};

/** Gets book counter by bookId from booksCounterService */
const getBookCounter = async (bookId: string): Promise<BookCounter> => {
  try {
    return await (await fetch(`${COUNTER_SERVICE_URL}/${bookId}`)).json();
  } catch (err) {
    return { viewsCount: null };
  }
};

/** Sends request to booksCounterService to increment book counter */
const incrementBookCounter = async (bookId: string): Promise<void> => {
  try {
    await (await fetch(`${COUNTER_SERVICE_URL}/${bookId}/incr`, { method: "POST" })).json();
  } catch (err) {
    void err;
  }
};

/*** Returns 404 error */
export const getNotFoundError = (res: any) => res.status(404).json({
  errmsg: "Book not found",
  errcode: 404,
});

/** [GET] Get all books */
export const getBooks: RequestHandler = async (req, res) => {
  try {
    const books = await BookModel.find();
  
    res.status(200).json(books);
  } catch (err) {
    getNotFoundError(res);
  }
};

/** [GET] Get book by id */
export const getBook: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await findBookById(id);

    res.status(200).json(book);
  } catch (err) {
    return getNotFoundError(res);
  }
};

/** [POST] Create book */
export const createBook: RequestHandler = async (req, res) => {
  try {
    const newBook = new BookModel({
      fileName: req.file?.filename,
      ...req.body,
      fileBook: req.file?.path ?? "",
    });

    console.log(newBook);
  
    const createdBook = await newBook.save();
    res.status(201).json(createdBook);
  } catch (err) {
    console.log(err);
  }
};

/** [PUT] Update book */
export const updateBook: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBook = await BookModel.findOneAndUpdate(
      {_id: id},
      { ...req.body },
      { new: true, }
    );

    console.log(updatedBook);
  
    res.status(200).json(updatedBook);
  } catch (err) {
    console.log(err);
  }
};

/** [DELETE] Delete book */
export const deleteBook: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await BookModel.deleteOne({ _id: id });

    console.log(deleted);
    
    res.status(200).send("ok");
  } catch (err)  {
    console.log(err);
  }
};

/** [GET] Download book */
// export const downloadBook: RequestHandler = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const book = await findBookById(id);
    
//     const { fileBook, fileName } = book;
  
//     res.download(fileBook, fileName);
//   } catch (err) {
//     return getNotFoundError(res);
//   }
// };

/** Rendering methods */
export const getBooksView: RequestHandler = async (req, res) => {
  const books = await BookModel.find();

  res.render("./books/index", { 
    title: "Книги",
    books,
  });
};

export const getBookView: RequestHandler = async (req, res) => {
  const { id } = req.params;
  
  const book = await findBookById(id);
  
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

export const getEditBookView: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const book = await findBookById(id);

  if (!book) {
    return res.redirect("/404");
  }

  res.render("./books/edit", { book });
};

export const getCreateBookView: RequestHandler = (req, res) => {
  res.render("./books/create", { book: {} });
   // try {
  // } catch (err) {
  //   console.log(err);
  // }
};
