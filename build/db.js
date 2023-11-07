"use strict";

var mongoose = require("mongoose");
mongoose.connect("".concat(process.env.BD_URL), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).then(function (db) {
  return console.log("Db is connected");
})["catch"](function (error) {
  return console.log(error);
});

// mongoose
//   .connect(`mongodb://localhost:27017/store_closetwithoutgender`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000,
//   })
//   .then((db) => console.log("Db is connected"))
//   .catch((error) => console.log(error));