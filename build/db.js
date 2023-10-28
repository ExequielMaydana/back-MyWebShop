"use strict";

var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://greedyshop:".concat(process.env.PASSWORD_MONGODB, "@greedyshop.ockn4yz.mongodb.net/"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).then(function (db) {
  return console.log("Db is connected");
})["catch"](function (error) {
  return console.log(error);
});