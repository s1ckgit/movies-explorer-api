const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/Unathorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const error = new UnathorizedError('Необходимо авторизоваться');

  if (!req.cookies.jwt) {
    next(error);
  }

  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (e) {
    next(error);
  }

  req.user = payload;

  next();
};
