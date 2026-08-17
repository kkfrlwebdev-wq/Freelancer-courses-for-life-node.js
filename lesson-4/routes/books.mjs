import { Router } from "express";
import BookController from "../controller/bookController.mjs";

const router = Router();

router.get("/", BookController.loadBook);
router.get("/add-book", BookController.addBook);
router.get("/edit/:id", BookController.openEditForm);
router.get("/detailsBook/:id", BookController.detailsBook);

router.post("/", BookController.saveNewBook);
router.post("/:id", BookController.updatedBook);

router.delete("/:id", BookController.deleteBook);

export default router;
