class BooksValidator {
  static BooksValidationSchema = {
    name: {
      notEmpty: {
        errorMessage: "Назва книги не може бути порожньою",
      },
      isLength: {
        options: { min: 2 },
        errorMessage: "Назва книги має містити щонайменше 2 символи",
      },
      trim: true,
    },
    author: {
      notEmpty: { errorMessage: "Автор не може бути порожнім" },
      isMongoId: { errorMessage: "Оберіть автора зі списку" },
      trim: true,
    },
    category: {
      notEmpty: { errorMessage: "Категорія не може бути порожньою" },
      trim: true,
    },
    year: {
      isInt: {
        options: { min: 1900, max: 2100 },
        errorMessage: "Рік має бути цілим числом від 1900 до 2100",
      },
      toInt: true,
    },
    price: {
      isFloat: {
        options: { min: 0 },
        errorMessage: "Ціна не може бути від'ємною",
      },
      toFloat: true,
    },
    inStock: {
      isInt: {
        options: { min: 0 },
        errorMessage: "Кількість має бути цілим невід'ємним числом",
      },
      toInt: true,
    },
    description: {
      notEmpty: { errorMessage: "Опис не може бути порожнім" },
      trim: true,
    },
  };
}

export default BooksValidator;
