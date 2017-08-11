'use strict';
const {
  bodyResponse,
  errorResponse
} = require('../../response');

const {
  AuthTokensModel,
  CustomError
} = require('../../../models');

const accessToken = {
  has(req, res, next) {
    let accessToken = req.header('x-access-token');
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
            const forbiddenError = new CustomError('Invalid x-access-token', 403);
            errorResponse.send(res, forbiddenError, req.Id);
          }
        })
        .catch(err => {
          errorResponse.send(res, err, req.id);
        });
    } else {
      const forbiddenError = new CustomError('Required x-access-token', 403);
      errorResponse.send(res, forbiddenError, req.Id);
    }
  }
};

module.exports = accessToken;