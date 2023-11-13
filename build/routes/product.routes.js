"use strict";

var router = require("express").Router();
var _require = require("../middleware/authorization"),
  verifyToken = _require.verifyToken,
  isAdmin = _require.isAdmin;
var productController = require("../controllers/product.controller");
var upload = require("../libs/multerConfig");
router.route("/").get(productController.getAllProduct);
router.route("/search").get(productController.getProductByParam);
router.route("/searchbyname").get(productController.searchProductByName);
router.route("/crear-producto").post(
// [verifyToken, isAdmin],
upload.array("files", 10), productController.postProduct);
router.route("/:id").get(productController.getProductById).put([verifyToken, isAdmin], productController.updateProduct)["delete"]([verifyToken, isAdmin], productController.deleteProduct);
module.exports = {
  router: router
};