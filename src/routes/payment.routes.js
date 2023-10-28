const router = require('express').Router()
const paymentControllers = require('../controllers/payment.controllers')

router.route('/confirmar-pago')
    .post(paymentControllers.confirmPayment)

router.route('/cancelar-pago')
    .post(paymentControllers.cancelPayment)

module.exports = {
    router
}