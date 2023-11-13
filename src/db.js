const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.BD_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then((db) => console.log("Db is connected"))
  .catch((error) => console.log(error));

// mongoose
//   .connect(
//     ``,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//     }
//   )
//   .then((db) => console.log("Db is connected"))
//   .catch((error) => console.log(error));
