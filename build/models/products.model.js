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
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  sizes: {
    type: [String]
  },
  garment_type: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  tags: {
    type: [String]
  },
  images: [{
    imageUrl: String,
    publicId: String
  }
  // {
  //   type: Schema.Types.ObjectId,
  //   ref: "Images",
  //   lowercase: true,
  //   required: true,
  // },
  ],

  price: {
    type: Number,
    trim: true,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  offer: {
    type: Boolean,
    "default": false
  },
  status: {
    type: String,
    "default": "active",
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = mongoose.model("product", productSchema);