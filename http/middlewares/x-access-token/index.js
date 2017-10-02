'use strict';

//
// internal modules
const { errorResponse } = require('../../response');
const { AuthTokensModel, CustomError } = require('../../../models');

//
// exposed
const accessTokenMiddlewar = {
  has(req, res, next) {
    const accessToken = req.header('x-access-token');
    if (accessToken) {
      AuthTokensModel.findOne({
        accessToken
      })
        .populate('user')
        .then(result => {
          if (result) {
            req.accessToken = result.toObject();
            next();
          } else {
            const forbiddenError = new CustomError('Invalid x-access-token', 403, 'forbidden');
            errorResponse.sendAndLog(res, forbiddenError, req.id);
          }
        })
        .catch(err => {
          errorResponse.sendAndLog(res, err, req.id);
        });
    } else {
      const forbiddenError = new CustomError('Required x-access-token', 403, 'forbidden');
      errorResponse.sendAndLog(res, forbiddenError, req.id);
    }
  }
};

//
// exposed methods
module.exports = accessTokenMiddlewar;