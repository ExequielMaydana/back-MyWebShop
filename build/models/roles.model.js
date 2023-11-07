"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var roleSchema = new Schema({
  name: {
    type: String
  }
}, {
  versionKey: false
});
module.exports = mongoose.model("roles", roleSchema);