import Author from "../models/authorModels.mjs";

class AuthorService {
  static async getAuthors() {
    return Author.find().sort({ name: 1 }).lean();
  }
}

export default AuthorService;
