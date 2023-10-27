const { FORBIDDEN_CODE } = require('../data/responseStatuses');
const UnathorizedError = require('../errors/Unathorized');
const Movie = require('../models/movie');

module.exports = (req, res, next) => {
  Movie.findById(req.params.movieId).orFail()
    .then((movie) => {
      if (movie.owner._id.toString() === req.user._id) {
        next();
      } else {
        next(new UnathorizedError('Недостаточно прав для удаления', FORBIDDEN_CODE));
      }
    })
    .catch(next);
};
