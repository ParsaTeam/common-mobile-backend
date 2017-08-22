'use strict';
//
// require internal modules
const { bodyResponse, errorResponse } = require('../../response');
const { AppsModel, CustomError } = require('../../../models/');

//
// methods to expose
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
            const forbiddenError = new CustomError('Invalid x-api-key', 403, 'forbidden');
            errorResponse.sendAndLog(res, forbiddenError, req.id);
          }
        })
        .catch(err => {
          errorResponse.sendAndLog(res, err, req.id);
        });
    } else {
      const forbiddenError = new CustomError('Required x-api-key', 403, 'forbidden');
      errorResponse.sendAndLog(res, forbiddenError, req.id);
    }
  }
};

//
// exposed methods
module.exports = apiKey;