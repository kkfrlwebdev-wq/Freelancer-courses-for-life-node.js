import { matchedData, validationResult } from "express-validator";
import AuthorService from "../services/authorService.mjs";

export async function BookValidationMiddleware(req, res, next) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    try {
      const authors = await AuthorService.getAuthors();

      return res.status(422).render("books/editForm", {
        dataBook: {
          ...req.body,
          ...(req.params.id ? { _id: req.params.id } : {}),
        },
        authors,
        errors: result.array().map((error) => error.msg),
        isEditing: Boolean(req.params.id),
      });
    } catch (error) {
      return next(error);
    }
  }

  req.validatedBookData = matchedData(req, { locations: ["body"] });
  next();
}
