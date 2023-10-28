const router = require('express').Router()

const orderControllers = require('../controllers/order.controllers')
const { verifyToken, isAdmin, isUser } = require("../middleware/authorization");

// verifico que el usuario inicio sesion antes de crear una orden.
router.route('/crear-orden') 
    .post([verifyToken], orderControllers.postOrder)
    
// solo el admin puede ver las ordenes de todos.
router.route('/') 
    .get([verifyToken, isAdmin], orderControllers.getAllOrders)

// my user
router.route('/me')
    .get([verifyToken], orderControllers.getAllMyOrders)

router.route('/:id')
    .get([verifyToken, isAdmin], orderControllers.getOrderById)
    .put([verifyToken, isAdmin], orderControllers.updateOrder)
    .delete([verifyToken, isAdmin], orderControllers.deleteOrder)

// my user
router.route('/me/:id')
    .get([verifyToken], orderControllers.getMyOrderById)
    .put([verifyToken], orderControllers.updateMyOrder)
    .delete([verifyToken], orderControllers.deleteMyOrder)

module.exports = {
    router
}