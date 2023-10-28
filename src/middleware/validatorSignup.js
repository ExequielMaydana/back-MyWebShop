const client = require("../models/clients.model");
const { check, validationResult } = require("express-validator");
const csrf = require("csrf");

const isMail = async (req, res, next) => {
  const userFound = await client.findOne({ email: req.body.email });

  if (userFound)
    return res
      .status(400)
      .json({ message: "Your email is already registered" });
  next();
};

const verifiCsrfToken = (req, res, next) => {
  const tokens = csrf({ cookie: true });
  const secret = tokens.secretSync();
  const create = tokens.create(secret);
  if (!create) return res.status(400).json({ message: "Invalid csrfToken" });
  next();
};

const validateSignUp = [
  check("full_name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("El nombre debe contener al menos 3 caracteres"),

  check("email")
    .notEmpty()
    .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
    .withMessage("Eso no parece un correo válido."),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
    .withMessage(
      "La contraseña debe tener entre 8 y 16 caracteres, al menos un numero, al menos una minúscula y al menos una mayúscula"
    ),
  check("confirmpassword")
    .notEmpty()
    .withMessage("Debes confirmar la contraseña")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),

  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array().map((err) => err) });
    }
  },
];

module.exports = {
  isMail,
  validateSignUp,
  verifiCsrfToken,
};
