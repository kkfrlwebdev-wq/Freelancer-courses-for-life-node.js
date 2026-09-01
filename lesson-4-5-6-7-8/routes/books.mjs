import { Router } from "express";
import { checkSchema } from "express-validator";
import BookController from "../controller/bookController.mjs";
import { BookValidationMiddleware } from "../middlewares/validationMiddleware.js";
import BooksValidator from "../validation/booksValidation.mjs";

const router = Router();

router.get("/", BookController.loadBook);
router.get("/add-book", BookController.addBook);
router.get("/edit/:id", BookController.openEditForm);
router.get("/detailsBook/:id", BookController.detailsBook);

const validateBook = [
  checkSchema(BooksValidator.BooksValidationSchema, ["body"]),
  BookValidationMiddleware,
];

router.post("/", validateBook, BookController.saveNewBook);
router.post("/:id", validateBook, BookController.updatedBook);
router.delete("/:id", BookController.deleteBook);

export default router;
