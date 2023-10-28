"use strict";

var router = require("express").Router();
var photoControllers = require('../controllers/photo.controllers');
router.route('/add').post(photoControllers.postPhoto);
module.exports = {
  router: router
};