'use strict';
//
// require internal modules
const { CustomError } = require('../../models');
const logger = require('../../logger');
const body = require('./body');

//
// exposed methods
const errorResponse = {
  sendAndLog(res, err, requestId) {
    res.header('Cache-Control', 'private, max-age=0, no-cache, no-store, must-revalidate');
    if (err instanceof CustomError) {
      logger.log.errorCustonError(err, requestId);
      switch (err.status) {
        case 400:
          res.json(err.status, body.badRequest(err.message, requestId));
          break;

        case 401:
          res.json(err.status, body.unauthorized(err.message, requestId));
          break;

        case 403:
          res.json(err.status, body.forbidden(err.message, requestId));
          break;

        case 404:
          res.json(err.status, body.notFound(err.message, requestId));
          break;

        case 500:
        default:
          res.json(500, body.internalServerError(err));
      }
    } else {
      logger.log.error(err, 'unknown', requestId);
      res.json(500, body.internalServerError(err));
    }
  },

  send(res, status, bodyResponse) {
    res.header('Cache-Control', 'private, max-age=0, no-cache, no-store, must-revalidate');
    res.json(status, bodyResponse);
  }
};

//
// exposed methods
module.exports = errorResponse;