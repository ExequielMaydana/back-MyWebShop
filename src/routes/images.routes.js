const router = require("express").Router();
const upload = require("../libs/multerConfig");

const imagesControllers = require("../controllers/images.controllers");

router.route("/add").post(upload.single("file"), imagesControllers.postImage);

router.route("/").get(imagesControllers.getAllImages);

module.exports = {
  router,
};
