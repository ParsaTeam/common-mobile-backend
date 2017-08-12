'use strict';
//
// requiere modules externals
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//
// auth tokens schema model
const AuthTokensSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
    index: true
  },
  accessTokenExpiresIn: Date,
  refreshToken: String,
  refreshTokenExpiresIn: {
    type: Date,
    expires: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
}, {
  versionKey: false
});

//
// model to export
module.exports = mongoose.model('auth_tokens', AuthTokensSchema);