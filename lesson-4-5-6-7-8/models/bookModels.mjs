import mongoose, { Schema } from "mongoose";
import Author from "./authorModels.mjs";

const bookSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Назва книги є обов'язковою"],
      trim: true,
      minlength: [2, "Назва книги має містити щонайменше 2 символи"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: Author,
      required: [true, "Автор є обов'язковим"],
    },
    category: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1900, max: 2100 },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Number, required: true, min: 0 },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Book", bookSchema);
