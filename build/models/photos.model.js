"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var imagesSchema = new Schema({
  title: String,
  imageURL: String,
  public_id: String
}, {
  versionKey: false
});
module.exports = mongoose.model("Images", imagesSchema);