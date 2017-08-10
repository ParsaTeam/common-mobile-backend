'use strict';
const {
  bodyResponse,
  errorResponse
} = require('../../response');

const {
  AuthTokensModel
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
            errorResponse.send(res, 403, bodyResponse.forbidden('Invalid x-access-token', req.id, 'invalid-access-token'));
          }
        })
        .catch(err => {
          errorResponse.send(res, 500, bodyResponse.internalServerError(err, req.id));
        });
    } else {
      errorResponse.send(res, 403, bodyResponse.forbidden('Required x-access-token', req.id, 'required-access-token'));
    }
  }
};

module.exports = accessToken;