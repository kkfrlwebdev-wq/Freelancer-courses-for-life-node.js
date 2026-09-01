import BookService from "../services/bookService.mjs";
import AuthorService from "../services/authorService.mjs";

class BookController {
  static async loadBook(req, res, next) {
    const { author = "", year = "" } = req.query;

    try {
      const books = await BookService.getBooks({
        author: String(author),
        year: String(year),
      });
      res.render("books/booksList", {
        dataBooks: books,
        filters: { author, year },
      });
    } catch (error) {
      next(error);
    }
  }
  static async addBook(req, res, next) {
    try {
      const authors = await AuthorService.getAuthors();

      res.render("books/editForm", {
        dataBook: {},
        authors,
        errors: [],
        isEditing: false,
      });
    } catch (error) {
      next(error);
    }
  }
  static async openEditForm(req, res, next) {
    const id = req.params.id;
    try {
      const [book, authors] = await Promise.all([
        BookService.getBookById(id),
        AuthorService.getAuthors(),
      ]);
      if (!book)
        return res
          .status(404)
          .render("error", { message: "Книгу не знайдено", error: {} });
      res.render("books/editForm", {
        dataBook: book,
        authors,
        errors: [],
        isEditing: true,
      });
    } catch (error) {
      next(error);
    }
  }
  static async detailsBook(req, res, next) {
    const id = req.params.id;
    try {
      const book = await BookService.getBookById(id);
      if (!book)
        return res
          .status(404)
          .render("error", { message: "Книгу не знайдено", error: {} });
      res.render("books/detailsBook", { dataBook: book });
    } catch (error) {
      next(error);
    }
  }

  static async updatedBook(req, res, next) {
    const id = req.params.id;
    try {
      const book = await BookService.updateBook(
        id,
        req.validatedBookData ?? req.body,
      );
      if (!book) return res.status(404).send("Книгу не знайдено");
      res.redirect("/books");
    } catch (error) {
      next(error);
    }
  }

  static async saveNewBook(req, res, next) {
    try {
      await BookService.createBook(req.validatedBookData ?? req.body);
      res.redirect("/books");
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    const id = req.params.id;
    try {
      const book = await BookService.deleteBook(id);
      if (!book) return res.status(404).json({ success: false });
      res.status(200).json({ success: true, id });
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
