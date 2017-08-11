'use strict';
const {
  bodyResponse,
  errorResponse
} = require('../../response');

const {
  AppsModel,
  CustomError
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
            const forbiddenError = new CustomError('Invalid x-api-key', 403);
            errorResponse.send(res, forbiddenError, req.Id);
          }
        })
        .catch(err => {
          errorResponse.send(res, err, req.id);
        });
    } else {
      const forbiddenError = new CustomError('Required x-api-key', 403);
      errorResponse.send(res, forbiddenError, req.Id);
    }
  }
};

module.exports = apiKey;