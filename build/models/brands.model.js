"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var brandsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  }
}, {
  versionKey: false
});
module.exports = mongoose.model("brands", brandsSchema);