const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const checkRights = require('../middlewares/checkRights');
const { deleteMovieValidation, createMovieValidation } = require('../middlewares/moviesValidation');

router.get('/', getMovies);

router.post('/', createMovieValidation, createMovie);

router.delete('/:movieId', deleteMovieValidation, checkRights, deleteMovie);

module.exports = router;
