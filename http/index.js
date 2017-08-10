'use strict';
const bodyResponse = require('./response/body'),
  errorResponse = require('./response/error'),
  cacheControl = require('./middlewares/cache-control'),
  accessToken = require('./middlewares/x-access-token'),
  apiKey = require('./middlewares/x-api-key'),
  server = require('./server');

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
