import mongoose, { Schema } from "mongoose";

const authorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title є обов'язковим"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "name є обов'язковим"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "address є обов'язковим"],
    trim: true,
  },
});

const Author = mongoose.models.Author ?? mongoose.model("Author", authorSchema);

export default Author;
