"use strict";

var router = require("express").Router();
var brandsControllers = require("../controllers/brands.controllers");
router.route("/add").post(brandsControllers.postBrands);
router.route("/").get(brandsControllers.getAllBrands);
router.route("/:id")["delete"](brandsControllers.deleteBrands);
module.exports = {
  router: router
};