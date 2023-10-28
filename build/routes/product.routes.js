"use strict";

var router = require("express").Router();
var _require = require("../middleware/authorization"),
  verifyToken = _require.verifyToken,
  isAdmin = _require.isAdmin;
var _require2 = require("../middleware/validatorPostProduct"),
  validateCreateProduct = _require2.validateCreateProduct;
var productController = require("../controllers/product.controller");
router.route("/").get(productController.getAllProduct);
router.route("/crear-producto").post(
// [verifyToken, isAdmin],
productController.postProduct);
router.route("/:id").get(productController.getProductById).put([verifyToken, isAdmin], productController.updateProduct)["delete"]([verifyToken, isAdmin], productController.deleteProduct);
module.exports = {
  router: router
};