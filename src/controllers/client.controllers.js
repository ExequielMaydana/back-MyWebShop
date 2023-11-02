const client = require("../models/clients.model");
const rol = require("../models/roles.model");
const { hashPassword } = require("../libs/crypt");
const cloudinary = require("../libs/configCloudinary");
const fs = require("fs-extra");

// este controlador es para que el admin pueda crear nuevos usuarios
const createUser = async (req, res, next) => {
  const { full_name, email, password, roles } = req.body;

  const newClient = new client({
    full_name,
    email,
    password: hashPassword(password),
    roles,
  });

  if (roles) {
    // verifico si el usuario indico algun rol y lo busco en la bd.
    const roleFound = await rol.find({ name: { $in: roles } });
    newClient.roles = roleFound.map((rol) => rol._id);
  } else {
    // si no, se le asigna por defecto el de user.
    const defaultRole = await rol.findOne({ name: "user" });
    newClient.roles = [defaultRole._id];
  }

  const tokenUser = jwt.sign({ id: newClient._id }, process.env.SECRET_WORD, {
    expiresIn: 86400,
  });

  try {
    newClient.token = tokenUser;
    await newClient.save();
    res
      .status(201)
      .json({ message: "The user was successfully created", user: newClient });
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

// mostrar todos los clientes
const getAllClients = async (req, res, next) => {
  const clients = await client
    .find({})
    .populate({ path: "roles", select: "name -_id" });
  try {
    res.status(200).json({ items: clients.length, clients: clients });
  } catch (error) {
    console.log(error);
    next();
  }
};

// mostrar un cliente por ID
const getClientById = async (req, res, next) => {
  const idClient = req.params.id;
  const clientById = await client
    .findById(idClient)
    .populate({ path: "roles", select: "name -_id" });
  if (clientById) {
    res.status(200).json({ client: clientById });
  } else {
    res
      .status(400)
      .json({ message: `client with id ${idClient} does not exist` });
    next();
  }
};

// editar un cliente por ID
const updateClient = async (req, res, next) => {
  const idClient = req.params.id;
  const newDataCLient = req.body;
  try {
    const clientUpdate = await client.findOneAndUpdate(
      { _id: idClient },
      newDataCLient,
      { new: true }
    );
    res.status(200).json({
      message: "The client has been successfully modified",
      client: clientUpdate,
    });
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

// eliminar un cliente por ID
const deleteClient = async (req, res, next) => {
  const idCLient = req.params.id;
  try {
    await client.findOneAndDelete({ _id: idCLient });
    res.status(204).json();
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

// my user

const getMyUser = async (req, res, next) => {
  try {
    const myUser = await client
      .find({ _id: req.userId })
      .select("-token -_id -password -createdAt -updatedAt")
      .populate({ path: "roles", select: "name -_id" });
    res.status(200).json(myUser);
  } catch (error) {
    res.status(400).json("error getMyUser", error);
    next();
  }
};

const updateMyUser = async (req, res, next) => {
  const newDataMyUser = req.body;
  const myUserUpdate = await client.findOneAndUpdate(
    { _id: req.userId },
    newDataMyUser,
    { new: true }
  );
  try {
    res
      .status(200)
      .json({ message: "The user was successfully modified", myUserUpdate });
  } catch (error) {
    res.status(400).json({ error });
    next();
  }
};

const updateMyPhoto = async (req, res, next) => {
  try {
    let imageUrl = "";
    let publicId = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    const newProfilePhoto = await client.findOneAndUpdate(
      { _id: req.userId },
      { profileImage: { imageUrl, publicId } },
      { new: true }
    );

    if (req.file) {
      await fs.unlink(req.file.path);
    }

    res.status(200).json({
      message: "The profile picture was successfully modified.",
      newProfilePhoto,
    });
  } catch (error) {
    res.status(500).json(error);
    next();
  }
};

const deleteMyUser = async (req, res, next) => {
  try {
    await client.findOneAndDelete({ _id: req.userId });
    res.status(200).json({ message: "The user was successfully modified" });
  } catch (error) {
    res.status(400).json({ error });
    next();
  }
};

module.exports = {
  createUser,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,

  getMyUser,
  updateMyUser,
  updateMyPhoto,
  deleteMyUser,
};
