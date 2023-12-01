const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SUCCES_CODE, SUCCES_CREATED_CODE } = require('../data/responseStatuses');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => {
      res.status(SUCCES_CODE).send(user);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => {
      res.status(SUCCES_CODE).send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((user) => {
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          }).status(SUCCES_CREATED_CODE).send({
            name,
            email,
            _id: user._id,
          });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findByCredentials(email, password)
    .then((user) => {
      const { name, email: userEmail, _id } = user;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .status(SUCCES_CODE)
        .send({
          name,
          email: userEmail,
          _id,
        });
    })
    .catch(next);
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie('jwt')
    .status(SUCCES_CODE)
    .send({ message: 'Вы вышли из аккаунта' });
};
