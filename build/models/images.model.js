"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var imagesSchema = new Schema({
  title: {
    type: String,
    lowercase: true
  },
  imageURL: String,
  public_id: String,
  position: {
    type: String,
    lowercase: true,
    trim: true
  }
}, {
  versionKey: false
});
module.exports = mongoose.model("images", imagesSchema);