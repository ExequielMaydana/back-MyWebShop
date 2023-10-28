"use strict";

// Configuration

var postImg = function postImg(pathImg) {
  var res = cloudinary.uploader.upload(pathImg);
  return res.secure_url;
};
module.exports = {
  cloudinaryConfig: cloudinaryConfig
};