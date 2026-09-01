import mongoose from "mongoose";
import Book from "../models/bookModels.mjs";
import Author from "../models/authorModels.mjs";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

class BookService {
  static async getBooks({ author = "", year = "" } = {}) {
    const filter = {};

    if (author.trim()) {
      const authorPattern = new RegExp(escapeRegExp(author.trim()), "i");

      const authors = await Author.find({
        $or: [{ name: authorPattern }],
      }).select("_id");

      filter.author = {
        $in: authors.map((author) => author._id),
      };
    }

    if (year !== "") {
      const numericYear = Number(year);

      if (Number.isInteger(numericYear)) {
        filter.year = numericYear;
      }
    }

    return Book.find(filter).sort({ createdAt: -1 }).populate("author").lean();
  }

  static async getBookById(id) {
    if (!mongoose.isValidObjectId(id)) return null;
    return Book.findById(id).populate("author").lean();
  }

  static createBook(data) {
    return Book.create(data);
  }

  static async updateBook(id, data) {
    if (!mongoose.isValidObjectId(id)) return null;
    return Book.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteBook(id) {
    if (!mongoose.isValidObjectId(id)) return null;
    return Book.findByIdAndDelete(id);
  }
}

export default BookService;
