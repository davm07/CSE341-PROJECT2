const router = require('express').Router();
const bookController = require('../controllers/book');
const validator = require('../middleware/validate');
const auth = require('../middleware/authentication');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

router.post(
  '/',
  auth.isAuthenticated,
  validator.bookRules(),
  validator.validateBook,
  bookController.createBook
);
router.put(
  '/:id',
  auth.isAuthenticated,
  validator.bookRules(),
  validator.validateBook,
  bookController.updateBook
);

router.delete('/:id', auth.isAuthenticated, bookController.deleteBook);

module.exports = router;
