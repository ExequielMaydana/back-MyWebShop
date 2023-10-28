"use strict";

var router = require('express').Router();
var paymentControllers = require('../controllers/payment.controllers');
router.route('/confirmar-pago').post(paymentControllers.confirmPayment);
router.route('/cancelar-pago').post(paymentControllers.cancelPayment);
module.exports = {
  router: router
};