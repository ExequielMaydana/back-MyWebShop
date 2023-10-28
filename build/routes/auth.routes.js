"use strict";

var router = require("express").Router();
var authControllers = require("../controllers/auth.controllers");
var _require = require("../middleware/validatorSignup"),
  verifiCsrfToken = _require.verifiCsrfToken,
  validateSignUp = _require.validateSignUp,
  isMail = _require.isMail;
router.route("/registrarse").post([verifiCsrfToken, validateSignUp, isMail], authControllers.signUp);

// router.route('/confirmar-cuenta/:token')
//   .get(authControllers.confirmAccount)

router.route("/iniciar-sesion").post(authControllers.login);
module.exports = {
  router: router
};