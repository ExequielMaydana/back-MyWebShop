"use strict";

var bcrypt = require('bcrypt');

//? esta funcion recibe la password en texto plano y la encripta.
var hashPassword = function hashPassword(plainTextPwd) {
  return bcrypt.hashSync(plainTextPwd, 10);
};

//? esta funcion compara la password en texto plano con la encriptada.
var comparePassword = function comparePassword(plainTextPwd, hashPassword) {
  return bcrypt.compareSync(plainTextPwd, hashPassword);
};
module.exports = {
  hashPassword: hashPassword,
  comparePassword: comparePassword
};