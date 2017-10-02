'use strict';

//
// modules internals
const bodyResponse = require('./response/body');
const errorResponse = require('./response/error');
const cacheControl = require('./middlewares/cache-control');
const accessToken = require('./middlewares/x-access-token');
const apiKey = require('./middlewares/x-api-key');
const server = require('./server');

//
// grouped modules to exposed
module.exports = {
  bodyResponse,
  errorResponse,
  middlewares: {
    cacheControl,
    accessToken,
    apiKey
  },
  server
};
