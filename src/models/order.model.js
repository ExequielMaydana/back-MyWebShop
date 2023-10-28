const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
    },
    producst: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: Number,
      },
    ],
    total: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("orders", orderSchema);
