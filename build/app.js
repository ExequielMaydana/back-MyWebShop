"use strict";

var express = require("express");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var cookieParser = require("cookie-parser");
var cors = require("cors");
var _require = require("./libs/startConfig"),
  createRoles = _require.createRoles;
var bodyParser = require("body-parser");
require("./db");

// rutas
var authRouters = require("./routes/auth.routes").router;
var clientRouters = require("./routes/client.routes").router;
var productRouters = require("./routes/product.routes").router;
var orderRouters = require("./routes/order.routes").router;
var paymentRouter = require("./routes/payment.routes").router;
var imagesRouter = require("./routes/images.routes").router;

// Initializations
var app = express();
createRoles();

// Setings
var port = process.env.PORT;
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/usuarios", clientRouters);
app.use("/api/v1/productos", productRouters);
app.use("/api/v1/pedidos", orderRouters);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/images", imagesRouter);
app.listen(port, function () {
  console.log("Server started at port ".concat(port));
});