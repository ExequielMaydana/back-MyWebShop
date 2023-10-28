const { check, validationResult } = require("express-validator");

// debo testear esto.
const validateCreateProduct = [
  check("name")
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("El nombre del producto debe tener al menos 4 caracteres."),
  check("description")
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("La descripcion del producto debe tener al menos 4 carateres"),
  check("category")
    .notEmpty()
    .withMessage("La categoria del producto es requerida."),
  check("price")
    .notEmpty()
    .isNumeric({ no_symbols: false })
    .withMessage("El precio del producto es requerido."),
  check("stock")
    .notEmpty()
    .isNumeric({ no_symbols: false })
    .withMessage("La cantidad de stock del producto es requerida."),

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
  validateCreateProduct,
};
