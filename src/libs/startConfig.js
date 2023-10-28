const rol = require("../models/roles.model");

const createRoles = async () => {
  try {
    const countDocuments = await rol.estimatedDocumentCount();
    if (countDocuments > 0) return;

    const res = await Promise.all([
      new rol({ name: "user" }).save(),
      new rol({ name: "admin" }).save(),
      new rol({ name: "moderator" }).save(),
    ]);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRoles,
};
