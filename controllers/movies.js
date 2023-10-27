const Movie = require('../models/movie');
const { SUCCES_CODE, SUCCES_CREATED_CODE } = require('../data/responseStatuses');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.stauts(SUCCES_CODE).send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => {
      res.status(SUCCES_CREATED_CODE).send(movie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .then((movie) => {
      res.status(SUCCES_CODE).send(movie);
    })
    .catch(next);
};
