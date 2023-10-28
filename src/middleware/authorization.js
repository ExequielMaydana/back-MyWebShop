// aca verifico si tiene el token, si es admin, user, moderator.
const jwt = require("jsonwebtoken");
require("dotenv").config();

const client = require("../models/clients.model");
const rol = require("../models/roles.model");

const verifyToken = async (req, res, next) => {
  // recibimos un token
  const token = req.headers["x-access-token"];

  // verificamos si existe.
  if (!token)
    return res.status(403).json({ message: "I do not provide the token" });

  // si existe, extraemos lo que esta dentro del token
  const decoded = jwt.verify(token, process.env.SECRET_WORD);
  req.userId = decoded.id;
  next();
};

const isAdmin = async (req, res, next) => {
  const verifiRolUser = await client.findById(req.userId); // uso el userId del token que lo almacenamos en el -> req
  const rolesUser = await rol.find({ _id: { $in: verifiRolUser.roles } });
  if (rolesUser[0].name === "admin") {
    return next();
  } else {
    res.status(403).json({
      message:
        "You do not have the necessary permissions to perform this action.",
    });
    return next();
  }
};

const isUser = async (req, res, next) => {
  const verifiRolUser = await client.findById(req.userId);
  const rolesUser = await rol.find({ _id: { $in: verifiRolUser.roles } });
  if (rolesUser[0].name === "user") {
    return next();
  } else {
    res.status(403).json({
      message:
        "You do not have the necessary permissions to perform this action.",
    });
    return next();
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isUser,
};
