const router = require("express").Router();

const imagesControllers = require("../controllers/images.controllers");

router.route("/add").post(imagesControllers.postImage);

router.route("/").get(imagesControllers.getAllImages);

module.exports = {
  router,
};
