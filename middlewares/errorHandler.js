const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const {
  NOT_FOUND_CODE, BAD_REQUEST_CODE, ALREADY_EXIST_CODE, SERVER_ERROR_CODE,
} = require('../data/responseStatuses');
const UnathorizedError = require('../errors/Unathorized');
const NotFoundError = require('../errors/NotFound');

module.exports = (err, req, res, next) => {
  if (err instanceof CastError) {
    res.status(BAD_REQUEST_CODE).send({ message: 'Проверьте корректность введённых данных' });
  } else if (err instanceof DocumentNotFoundError) {
    res.status(NOT_FOUND_CODE).send({ message: 'Данные не были найдены' });
  } else if (err instanceof ValidationError) {
    res.status(BAD_REQUEST_CODE).send({ message: 'Ошибка валидации, проверьте корректность данных', errors: err });
  } else if (err instanceof UnathorizedError) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err.code === 11000) {
    res.status(ALREADY_EXIST_CODE).send({ message: 'Такой пользователь уже существует' });
  } else if (err instanceof NotFoundError) {
    res.status(err.statusCode).send({ message: 'Такой страницы не существует' });
  } else {
    res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка на стороне сервера' });
  }
  next();
};
