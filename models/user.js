const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').orFail()
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Хуяру те, пароль или почта не те'));
      }

      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Хуяру те, пароль или почта не те'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
