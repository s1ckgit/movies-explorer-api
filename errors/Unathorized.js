const { NOT_AUTHORIZED_CODE } = require('../data/responseStatuses');

module.exports = class UnathorizedError extends Error {
  constructor(message, code = NOT_AUTHORIZED_CODE) {
    super(message);
    this.statusCode = code;
  }
};
