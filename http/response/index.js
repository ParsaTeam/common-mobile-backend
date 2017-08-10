'use strict';
// 
// require internal modules
const body = require('./body'),
 error = require('./error');

 //
 // grouped modules to export
 module.exports = {
   bodyResponse:  body,
   errorResponse: error
 };