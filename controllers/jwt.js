const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnathorizedError = require('../errors/Unathorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.checkJwt = (req, res, next) => {
  const { _id } = req.body;
  if (!req.cookies.jwt) {
    next(new UnathorizedError('Ошибка авторизации'));
  } else {
    const token = req.cookies.jwt;
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
    } catch (e) {
      next(new UnathorizedError('Ошибка авторизации'));
    }
    if (payload._id === _id) {
      User.findById(_id).orFail()
        .then((user) => {
          res
            .status(200)
            .send(user);
        });
    } else {
      next(new UnathorizedError('Ошибка авторизации'));
    }
  }
};
