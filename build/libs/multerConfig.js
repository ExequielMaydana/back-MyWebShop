"use strict";

var multer = require("multer");
var path = require("path");
var storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: function filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage
});
module.exports = upload;