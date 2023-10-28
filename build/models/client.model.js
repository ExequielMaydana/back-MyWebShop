"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var clientSchema = new Schema({
  first_and_last_name: {
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
    required: true,
    trim: true
  },
  status: {
    type: String,
    "default": "Active"
  },
  token: {
    type: String
  },
  confirmed: {
    type: Boolean,
    "default": false
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: "role"
  }]
}, {
  timestamps: true,
  versionKey: false
});
module.exports = mongoose.model("client", clientSchema);