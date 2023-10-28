"use strict";

var express = require("express");
var multer = require("multer");
var path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var cookieParser = require("cookie-parser");
var cors = require("cors");
var _require = require("./libs/startConfig"),
  createRoles = _require.createRoles,
  createCategory = _require.createCategory;
var bodyParser = require("body-parser");
require("./db");

// rutas
var authRouters = require("./routes/auth.routes").router;
var clientRouters = require("./routes/client.routes").router;
var productRouters = require("./routes/product.routes").router;
var orderRouters = require("./routes/order.routes").router;
var paymentRouter = require("./routes/payment.routes").router;
var categoriesRouter = require("./routes/categories.routes").router;
var imagesRouter = require("./routes/images.routes").router;
var brandsRouter = require("./routes/brands.routes").router;

// Initializations
var app = express();
createRoles();
createCategory();

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
var storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: function filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
app.use(multer({
  storage: storage
}).single("images"));
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/usuarios", clientRouters);
app.use("/api/v1/productos", productRouters);
app.use("/api/v1/pedidos", orderRouters);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/images", imagesRouter);
app.use("/api/v1/brands", brandsRouter);
app.listen(port, function () {
  console.log("Server started at port ".concat(port));
});