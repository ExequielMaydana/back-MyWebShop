const order = require("../models/order.model");
const product = require("../models/products.model");

const postOrder = async (req, res, next) => {
  const { client, producst } = req.body;

  const prices = [];

  for (let value of producst) {
    let productFound = await product.findById(value.product);

    if (productFound.stock > value.quantity) {
      const totalXProduct = productFound.price * value.quantity;

      prices.push(totalXProduct);

      productFound.stock -= value.quantity;
      await productFound.save();
    } else {
      res
        .status(400)
        .json({ message: "The product you wish to purchase is not in stock" });
      return next();
    }
  }

  const totalFinal = prices.reduce((a, b) => a + b, 0);

  const newOrder = new order({
    client,
    producst,
    total: totalFinal,
  });

  try {
    await newOrder.save();
    res
      .status(201)
      .json({ message: "The order was successfully created", order: newOrder });
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

const getAllOrders = async (req, res) => {
  const orders = await order
    .find()
    .populate({ path: "client", select: "first_and_last_name email" })
    .populate({
      path: "producst.product",
      select: "name category img price",
      model: "product",
    });
  res.status(200).json({ items: orders.length, orders: orders });
};

const getOrderById = async (req, res, next) => {
  const idOrder = req.params.id;
  const orderById = await order
    .findById(idOrder)
    .populate({ path: "client", select: "first_and_last_name email" })
    .populate({
      path: "producst.product",
      select: "name category img valueprice",
      model: "product",
    });
  if (!orderById) {
    res
      .status(400)
      .json({ message: `The order with the id ${idOrder} does not exist` });
    return next();
  }
  res.status(200).json(orderById);
};

const updateOrder = async (req, res, next) => {
  const idOrder = req.params.id;
  const newDataOrder = req.body;

  const orderUpdate = await order
    .findOneAndUpdate({ _id: idOrder }, newDataOrder, { new: true })
    .populate({ path: "client", select: "first_and_last_name email" })
    .populate({
      path: "producst.product",
      select: "name category img price",
      model: "product",
    });

  try {
    res.status(200).json({
      message: "The order was successfully modified",
      order_update: orderUpdate,
    });
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

const deleteOrder = async (req, res, next) => {
  const idORder = req.params.id;
  try {
    await order.findOneAndDelete({ _id: idORder });
    res.status(204).json();
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

// my user

/*
  en -> req.userId se almacena el TOKEN del usuario que inicio sesion.
  Ese token contiene toda la informacion del usuario, incluyendo su ID.
  Con el ID del usuario, verifico si tiene alguna orden.
*/
const getAllMyOrders = async (req, res, next) => {
  const ordersUser = await order
    .find({ client: { $in: req.userId } })
    .populate({ path: "client", select: "first_and_last_name email" })
    .populate({
      path: "producst.product",
      select: "name category img price",
      model: "product",
    });

  if (ordersUser) {
    return res
      .status(200)
      .json({ items: ordersUser.length, orders: ordersUser });
  }
  next();
};

const getMyOrderById = async (req, res, next) => {
  const idMyOrder = req.params.id;
  const filteredOrderById = await order
    .findById(idMyOrder)
    .where({ client: { $in: req.userId } })
    .populate({ path: "client", select: "first_and_last_name email" })
    .populate({
      path: "producst.product",
      select: "name category img valueprice",
      model: "product",
    });
  if (filteredOrderById) return res.status(200).json(filteredOrderById);
  res.status(400).json({
    message: `The user does not have an order with this id ${idMyOrder}`,
  });
  next();
};

const updateMyOrder = async (req, res, next) => {
  const idMyOrder = req.params.id;
  const { client, producst, total } = req.body;

  // modifico la orden, verificando que pertenezca al usuario.
  await order
    .findOneAndUpdate({ _id: idMyOrder }, { client, producst, total })
    .where({ client: { $in: req.userId } })
    .populate({ path: "client", select: "first_and_last_name email" })
    .populate({
      path: "producst.product",
      select: "name category img price",
      model: "product",
    });

  // luego actualizo el total a pagar y actualizo el stock de los productos.
  const prices = [];

  for (let value of producst) {
    let productFound = await product.findById(value.product);

    if (productFound.stock > value.quantity) {
      const totalXProduct = productFound.price * value.quantity;

      prices.push(totalXProduct);

      productFound.stock -= value.quantity;
      await productFound.save();
    } else {
      res
        .status(400)
        .json({ message: "The product you wish to purchase is not in stock" });
      return next();
    }
  }

  const totalFinal = prices.reduce((a, b) => a + b, 0);

  // finalmente modifico el total y muestro la orden modificada.
  const updateTotalOrder = await order.findOneAndUpdate(
    { _id: idMyOrder },
    { total: totalFinal },
    { new: true }
  );

  try {
    res
      .status(200)
      .json({ message: "Order was successfully modified", updateTotalOrder });
  } catch (error) {
    res.status(400).json({ error });
    next();
  }
};

const deleteMyOrder = async (req, res, next) => {
  const idMyOrder = req.params.id;
  if (idMyOrder) {
    const ordersDelete = await order
      .findById(idMyOrder)
      .where({ client: { $in: req.userId } });
    const productsOrder = ordersDelete.producst;

    for (let value of productsOrder) {
      const productFound = await product.findById(value.product);
      if (productFound) {
        productFound.stock += value.quantity;
        await productFound.save();
      }
    }
  }

  try {
    await order.findOneAndDelete({ _id: idMyOrder });
    res.status(200).json({ message: "The order was successfully cancelled" });
  } catch (error) {
    res.status(400).json({ error });
    next();
  }
};

module.exports = {
  postOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,

  getAllMyOrders,
  getMyOrderById,
  updateMyOrder,
  deleteMyOrder,
};
