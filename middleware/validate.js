const { body, validationResult } = require('express-validator');
const createError = require('http-errors');
const validator = {};

validator.movieRules = () => {
  return [
    body('title').isLength({ min: 1 }).isString(),
    body('year')
      .custom((value) => typeof value === 'number')
      .isInt({ min: 1900 })
      .isNumeric(),
    body('director').isLength({ min: 1 }).isString(),
    body('duration').isLength({ min: 2 }).isString(),
    body('poster').isURL(),
    body('rate')
      .custom((value) => typeof value === 'number')
      .isDecimal({ min: 1, max: 10 })
      .isNumeric(),
    body('genre').isArray({ min: 1 }),
    body('genre.*').isString()
  ];
};

validator.validateMovie = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw createError(422, errors.array());
  }

  next();
};

validator.bookRules = () => {
  return [
    body('title').isLength({ min: 1 }).isString(),
    body('release_year')
      .custom((value) => typeof value === 'number')
      .isInt({ min: 1000 })
      .isNumeric(),
    body('number_of_pages')
      .custom((value) => typeof value === 'number')
      .isNumeric()
      .isInt({ min: 1 }),
    body('author').isLength({ min: 2 }).isString(),
    body('book_cover').isURL(),
    body('genre').isArray({ min: 1 }),
    body('genre.*').isString()
  ];
};

validator.validateBook = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw createError(422, errors.array());
  }

  next();
};

module.exports = validator;
