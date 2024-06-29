const router = require('express').Router();
const movieController = require('../controllers/movie');
const validator = require('../middleware/validate');

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

router.post('/', validator.movieRules(), validator.validateMovie, movieController.createMovie);
router.put('/:id', validator.movieRules(), validator.validateMovie, movieController.updateMovie);

router.delete('/:id', movieController.deleteMovie);

module.exports = router;
