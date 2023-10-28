const router = require("express").Router();
const { verifyToken, isAdmin, isUser } = require("../middleware/authorization");
const { validateSignUp } = require("../middleware/validatorSignup");

const clientControllers = require("../controllers/client.controllers");

router
  .route("/crear-usuario")
  .post([verifyToken, isAdmin, validateSignUp], clientControllers.createUser); // ruta para que el admin pueda crear usuario

router.route("/").get([verifyToken, isAdmin], clientControllers.getAllClients);

router
  .route("/me")
  .get([verifyToken], clientControllers.getMyUser)
  .put([verifyToken], clientControllers.updateMyUser)
  .delete([verifyToken], clientControllers.deleteMyUser);

router
  .route("/:id")
  .get([verifyToken, isAdmin], clientControllers.getClientById)
  .put([verifyToken, isAdmin], clientControllers.updateClient)
  .delete([verifyToken, isAdmin], clientControllers.deleteClient);



module.exports = {
  router,
};
