const { hashPassword, comparePassword } = require("../libs/crypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../libs/configCloudinary");
const fs = require("fs-extra");
const client = require("../models/clients.model");
const rol = require("../models/roles.model");

const signUp = async (req, res, next) => {
  const { full_name, email, password, roles, profileImage, dni, phone } =
    req.body;

  const newClient = new client({
    full_name,
    email,
    password: hashPassword(password),
    roles,
    dni,
    phone,
    profileImage,
  });

  let imageUrl = "";
  let publicId = "";

  if (roles) {
    const roleFound = await rol.find({ name: { $in: roles } });
    newClient.roles = roleFound.map((rol) => rol._id);
  } else {
    const defaultRole = await rol.findOne({ name: "user" });
    newClient.roles = [defaultRole._id];
  }

  if (req.file) {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    imageUrl = uploadResult.secure_url;
    publicId = uploadResult.public_id;
  }

  if (req.file) {
    await fs.unlink(req.file.path);
  }

  const tokenUser = jwt.sign({ id: newClient._id }, process.env.SECRET_WORD, {
    expiresIn: 3600,
  });

  newClient.token = tokenUser;
  newClient.profileImage = { imageUrl, publicId };

  try {
    await newClient.save();
    res.status(201).json({
      message: "User successfully created",
      cliente: newClient,
    });
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

// pending -> Se debe implementar Auth0

// const confirmAccount = async (req, res, next) => {
//   const tokenUser = req.params.token;

//   verificar si el token es valido.
//   const userFound = await client.findOne({ token: tokenUser });

//   if (!userFound)
//     return res
//       .status(400)
//       .json({ message: "There is no user registered with these credentials." });

//   confirmar cuenta.
//   userFound.token = null;
//   userFound.confirmed = true;
//   await userFound.save();
//   next();
// };

const login = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await client
    .findOne({ email: email })
    .populate({ path: "roles", select: "name -_id" });
  if (!userFound)
    return res.status(401).json({ message: "Invalid credentials" });

  const matchPassword = comparePassword(password, userFound.password);

  if (!matchPassword)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: userFound._id }, process.env.SECRET_WORD, {
    expiresIn: 86400,
  });

  res.status(200).json({ user: userFound.roles, token: token });
};

module.exports = {
  signUp,
  // confirmAccount,
  login,
};
