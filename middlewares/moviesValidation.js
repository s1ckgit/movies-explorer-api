const { celebrate, Joi } = require('celebrate');

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/\/[\w-]+(\/.+)?/i),
    trailerLink: Joi.string().required().regex(/https?:\/\/(www\.)?[\w-]+\.\w+(\/.+)?/i),
    thumbnail: Joi.string().required().regex(/\/[\w-]+(\/.+)?/i),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }).unknown(),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});
