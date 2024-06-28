const router = require('express').Router();
const movieController = require('../controllers/movie');

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);

router.delete('/:id', movieController.deleteMovie);

module.exports = router;
