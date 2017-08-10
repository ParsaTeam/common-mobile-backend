'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const AppsSchema = new Schema({
  key: { type: String, unique: true, required: true, index: true },
  name: String,
  code: String,
  type: String,
  iconUrl: String,
  settings: Object
}, { versionKey: false, upsert: true });

module.exports = mongoose.model('apps', AppsSchema);