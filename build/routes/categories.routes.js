"use strict";

var router = require("express").Router();
var categoriesControllers = require('../controllers/categories.controllers');
router.route('/add').post(categoriesControllers.postCategory);
router.route('/').get(categoriesControllers.getAll);
router.route('/:id')["delete"](categoriesControllers.deleteCategory);
module.exports = {
  router: router
};