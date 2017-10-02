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
      const metadata = {
        status: err.status,
        category: err.category,
        orinalStack: err.orinalStack,
        requestId
      };
      logger.log.errorWithMetadata(err, metadata);
      switch (err.status) {
        case 400:
          res.status(400).json(body.badRequest(err.message, requestId));
          break;

        case 401:
          res.status(401).json(body.unauthorized(err.message, requestId));
          break;

        case 403:
          res.status(403).json(body.forbidden(err.message, requestId));
          break;

        case 404:
          res.status(404).json(body.notFound(err.message, requestId));
          break;

        case 412:
          res.status(412).json(body.preconditionFailed(err.message, requestId));
          break;

        case 500:
        default:
          res.status(500).json(body.internalServerError(err));
      }
    } else {
      const metadata = {
        category: 'internal-error',
        requestId
      };
      logger.log.errorWithMetadata(err, metadata);
      res.status(500).json(body.internalServerError(err));
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