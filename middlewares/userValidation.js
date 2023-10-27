const { celebrate, Joi } = require('celebrate');

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});
