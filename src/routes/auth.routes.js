const router = require("express").Router();
const upload = require("../libs/multerConfig");

const authControllers = require("../controllers/auth.controllers");

const {
  verifiCsrfToken,
  validateSignUp,
  isMail,
} = require("../middleware/validatorSignup");

router
  .route("/registrarse")
  .post(
    verifiCsrfToken,
    isMail,
    upload.single("file"),
    validateSignUp,
    authControllers.signUp
  );

// router.route('/confirmar-cuenta/:token')
//   .get(authControllers.confirmAccount)

router.route("/iniciar-sesion").post(authControllers.login);

module.exports = {
  router,
};
