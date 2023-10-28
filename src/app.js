const express = require("express");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createRoles } = require("./libs/startConfig");
const bodyParser = require("body-parser");
require("./db");

// rutas
const authRouters = require("./routes/auth.routes").router;
const clientRouters = require("./routes/client.routes").router;
const productRouters = require("./routes/product.routes").router;
const orderRouters = require("./routes/order.routes").router;
const paymentRouter = require("./routes/payment.routes").router;
const imagesRouter = require("./routes/images.routes").router;

// Initializations
const app = express();
createRoles();

// Setings
const port = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouters);
app.use("/api/v1/usuarios", clientRouters);
app.use("/api/v1/productos", productRouters);
app.use("/api/v1/pedidos", orderRouters);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/images", imagesRouter);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
