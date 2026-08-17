import bookModels from "../models/bookModels.mjs";
import { v4 as uuidv4 } from "uuid";

const booksData = new bookModels();

class BookController {
  static loadBook(req, res) {
    const { author = "", year = "" } = req.query;
    const allBooks = booksData.loadBook();

    let filteredBooks = allBooks;

    if (author) {
      filteredBooks = filteredBooks.filter((book) =>
        (book.author || "")
          .toLowerCase()
          .includes(String(author).toLowerCase()),
      );
    }

    if (year) {
      filteredBooks = filteredBooks.filter(
        (book) => String(book.year) === String(year),
      );
    }

    res.render("books/booksList", {
      dataBooks: filteredBooks,
      filters: { author, year },
    });
  }
  static addBook(req, res) {
    res.render("books/editForm", { dataBook: null });
  }
  static openEditForm(req, res) {
    const id = req.params.id;
    const book = booksData.addBookById(id);
    res.render("books/editForm", { dataBook: book });
  }
  static detailsBook(req, res) {
    const id = req.params.id;
    const book = booksData.addBookById(id);
    res.render("books/detailsBook", { dataBook: book });
  }

  static updatedBook(req, res) {
    const id = req.params.id;
    const book = req.body;

    booksData.updatedBook(id, book);
    res.redirect("/books");
  }

  static saveNewBook(req, res) {
    const book = req.body;

    booksData.saveNewBook({ id: uuidv4(), ...book });
    res.redirect("/books");
  }

  static deleteBook(req, res) {
    const id = req.params.id;
    booksData.deleteBook(id);
    res.status(200).json({ success: true, id });
  }
}

export default BookController;
