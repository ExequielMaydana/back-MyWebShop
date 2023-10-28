"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorySchema = new Schema({
  name: {
    type: String
  }
}, {
  versionKey: false
});
module.exports = mongoose.model('categories', categorySchema);