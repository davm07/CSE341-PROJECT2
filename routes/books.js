const router = require('express').Router();
const bookController = require('../controllers/book');
const validator = require('../middleware/validate');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

router.post('/', validator.bookRules(), validator.validateBook, bookController.createBook);
router.put('/:id', validator.bookRules(), validator.validateBook, bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;
