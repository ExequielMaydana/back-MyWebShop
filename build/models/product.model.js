"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    trim: true,
    required: true
  },
  img: [{
    type: String
  }],
  price: {
    type: Number,
    trim: true,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = mongoose.model("product", productSchema);