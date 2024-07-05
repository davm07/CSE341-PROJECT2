const router = require('express').Router();
const movieController = require('../controllers/movie');
const validator = require('../middleware/validate');
const auth = require('../middleware/authentication');

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

router.post(
  '/',
  auth.isAuthenticated,
  validator.movieRules(),
  validator.validateMovie,
  movieController.createMovie
);
router.put(
  '/:id',
  auth.isAuthenticated,
  validator.movieRules(),
  validator.validateMovie,
  movieController.updateMovie
);

router.delete('/:id', auth.isAuthenticated, movieController.deleteMovie);

module.exports = router;
