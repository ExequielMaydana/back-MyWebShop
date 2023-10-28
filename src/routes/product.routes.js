const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middleware/authorization");
const productController = require("../controllers/product.controller");
const upload = require("../libs/multerConfig");

router.route("/").get(productController.getAllProduct);
router.route("/search").get(productController.getProductByParam);
router.route("/crear-producto").post(
  // [verifyToken, isAdmin],
  upload.array("files", 10),
  productController.postProduct
);

router
  .route("/:id")
  .get(productController.getProductById)
  .put([verifyToken, isAdmin], productController.updateProduct)
  .delete([verifyToken, isAdmin], productController.deleteProduct);

module.exports = {
  router,
};
