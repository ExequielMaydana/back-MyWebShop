"use strict";

var router = require("express").Router();
var _require = require("../middleware/authorization"),
  verifyToken = _require.verifyToken,
  isAdmin = _require.isAdmin,
  isUser = _require.isUser;
var _require2 = require("../middleware/validatorSignup"),
  validateSignUp = _require2.validateSignUp;
var clientControllers = require("../controllers/client.controllers");
router.route("/crear-usuario").post([verifyToken, isAdmin, validateSignUp], clientControllers.createUser); // ruta para que el admin pueda crear usuario

router.route("/").get([verifyToken, isAdmin], clientControllers.getAllClients);
router.route("/me").get([verifyToken], clientControllers.getMyUser).put([verifyToken], clientControllers.updateMyUser)["delete"]([verifyToken], clientControllers.deleteMyUser);
router.route("/:id").get([verifyToken, isAdmin], clientControllers.getClientById).put([verifyToken, isAdmin], clientControllers.updateClient)["delete"]([verifyToken, isAdmin], clientControllers.deleteClient);
module.exports = {
  router: router
};