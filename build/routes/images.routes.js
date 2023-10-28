"use strict";

var router = require("express").Router();
var imagesControllers = require("../controllers/images.controllers");
router.route("/add").post(imagesControllers.postImage);
router.route("/").get(imagesControllers.getAllImages);
module.exports = {
  router: router
};