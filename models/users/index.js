'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  encrypt = require('mongoose-encryption');

const encryptionKey = process.env.MONGODB_ENCRYPTION_KEY, // SOME 32 BYTE BASE64 STRING
  signingKey = process.env.MONGODB_SIGNING_KEY; // SOME 64 BYTE BASE64 STRING

const UsersSchema = new Schema({
  documentId: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  documentType: String,
  accountIds: Array,
  name: String,
  fullName: String,
  userName: String,
  userType: String,
  email: String,
  birthDate: String,
  state: String,
  city: String,
  zipCode: String,
  phoneNumbers: Array
}, {
  versionKey: false
});

UsersSchema.plugin(encrypt, {
  encryptionKey,
  signingKey
});

module.exports = mongoose.model('users', UsersSchema);