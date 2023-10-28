"use strict";

var router = require('express').Router();
var orderControllers = require('../controllers/order.controllers');
router.route('/').get(orderControllers.getAllOrders);
router.route('/confirmar-pedido').post(orderControllers.postOrder);
router.route('/:id').get(orderControllers.getOrderById).put(orderControllers.updateOrder)["delete"](orderControllers.deleteOrder);
module.exports = {
  router: router
};