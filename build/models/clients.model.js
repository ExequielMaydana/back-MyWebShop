"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var clientSchema = new Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  confirmpassword: {
    type: String,
    trim: true
  },
  dni: {
    type: Number,
    trim: true
  },
  phone: {
    type: Number,
    trim: true
  },
  status: {
    type: String,
    "default": "Active"
  },
  profileImage: {
    imageUrl: String,
    publicId: String
  },
  // token: {
  //   type: String,
  // },
  // confirmed: {
  //   type: Boolean,
  //   default: false,
  // },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: "roles"
  }]
}, {
  timestamps: true,
  versionKey: false
});
module.exports = mongoose.model("clients", clientSchema);