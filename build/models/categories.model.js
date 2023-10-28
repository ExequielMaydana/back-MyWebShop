"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  }
}, {
  versionKey: false
});
module.exports = mongoose.model("categories", categorySchema);