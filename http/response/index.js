'use strict';

// 
// require internal modules
const body = require('./body');
const error = require('./error');

//
// grouped modules to export
module.exports = {
  bodyResponse: body,
  errorResponse: error
};