'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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

module.exports = mongoose.model('auth_tokens', AuthTokensSchema);