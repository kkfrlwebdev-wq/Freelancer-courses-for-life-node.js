import DataFileManager from "../utils/DataFileManager.js";
import settings from "../settings.mjs";

class BookModels {
  constructor() {
    this.dataFileManager = new DataFileManager(settings.dataPath);
  }

  loadBook() {
    return this.dataFileManager.loadData();
  }

  addBookById(id) {
    return this.dataFileManager.getItemById(id);
  }

  findByAuthor(author) {
    return this.dataFileManager.findByAuthor(author);
  }

  filterByYear(year) {
    return this.dataFileManager.filterByYear(year);
  }

  updatedBook(id, updatedProperties) {
    this.dataFileManager.updatedItemById(id, updatedProperties);
  }

  saveNewBook(data) {
    this.dataFileManager.addItem(data);
  }
  deleteBook(id) {
    this.dataFileManager.deleteItemById(id);
  }
}
export default BookModels;
