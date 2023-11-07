"use strict";

var router = require("express").Router();
var upload = require("../libs/multerConfig");
var imagesControllers = require("../controllers/images.controllers");
router.route("/add").post(upload.single("file"), imagesControllers.postImage);
router.route("/").get(imagesControllers.getAllImages);
module.exports = {
  router: router
};