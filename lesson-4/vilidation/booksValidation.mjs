class BooksValidator {
  static BooksValidationSchema = {
    name: {
      notEmpty: {
        errorMessage: 'Ім"я не може бути потожнім!',
      },
      isLength: {
        options: { min: 2 },
        errorMessage: 'Довжина імені має бути >= 2!',
      },
      trim: true,
      escape: true,
    },
    email: {
      isEmail: {
        errorMessage: 'Пошта повинна мати коректний формат!',
      },
      trim: true,
      escape: true,
    },
    password: {
      isLength: {
        options: { min: 6 },
        errorMessage: 'Довжина паролю має бути >= 6!',
      },
      trim: true,
      escape: true,
    },
  }
}

export default BooksValidator