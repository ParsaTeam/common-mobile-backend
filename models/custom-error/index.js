'use strict';
const { categories } = require('../../logger');

//
// class to model "custom error" of mobile backend
class CustomError extends Error {
  constructor(message, status, category, orinalStack) {
    // Calling parent constructor of base Error class.
    super(message);

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    this.status = status || 500;

    this.category = category || 'internal-error';

    this.orinalStack = orinalStack || this.stack;
  }
}

//
// model to export
module.exports = CustomError;