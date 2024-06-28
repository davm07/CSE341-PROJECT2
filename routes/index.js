const router = require('express').Router();

router.use('/movies', require('./movies'));
router.use('/books', require('./books'));
router.use('/api-docs', require('./swagger'));

module.exports = router;
