'use strict';

//
// requiere modules externals
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//
// app schema model
const AppsSchema = new Schema({
  key: { type: String, unique: true, required: true, index: true },
  name: String,
  code: String,
  type: String,
  iconUrl: String,
  settings: Object
}, { versionKey: false, upsert: true });

//
// model to export
module.exports = mongoose.model('apps', AppsSchema);