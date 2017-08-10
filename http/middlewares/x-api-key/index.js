'use strict';
const {
  bodyResponse,
  errorResponse
} = require('../../response');

const {
  AppsModel
} = require('../../../models/');

const apiKey = {
  has(req, res, next) {
    let apiKey = req.header('x-api-key');
    // Auth IDM
    if (apiKey === undefined && req.url.indexOf('/auth/') !== -1)
      apiKey = req.query.state;

    if (apiKey) {
      AppsModel.findOne({
          key: apiKey
        })
        .then(result => {
          if (result) {
            req.app = result.toObject();
            next();
          } else {
            errorResponse.send(res, 403, bodyResponse.forbidden('Invalid x-api-key', req.id, 'invalid-api-key'));
          }
        })
        .catch(err => {
          errorResponse.send(res, 500, bodyResponse.internalServerError(err, req.id));
        });
    } else {
      errorResponse.send(res, 403, bodyResponse.forbidden('Required x-api-key', req.id, 'required-api-key'));
    }
  }
};

module.exports = apiKey;