"use strict";

var multer = require('multer');
var shortid = require('shortid');
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    var extension = file.mimetype.split('/')[1];
    cb(null, "".concat(shortid.generate(), ".").concat(extension));
  }
});
var uploadMulter = multer({
  // upload con validacion de extension de imagenes
  storage: storage,
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp" || file.mimetype == "image/svg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg, webp and svg format allowed!'));
    }
  }
}).single('img'); // hace referencia al nombre de la propiedad del modelo donde se guardan las imagenes.

module.exports = {
  uploadMulter: uploadMulter
};