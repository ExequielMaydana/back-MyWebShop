const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        imageUrl: String,
        publicId: String,
      },
    ],
    product_code: {
      type: String,
      trim: true,
      lowercase: true,
    },
    brand: {
      type: String,
      trim: true,
      lowercase: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    product_type: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    colors: [
      {
        color: String,
      },
    ],
    sizes: [
      {
        size: String,
      },
    ],
    tags: [
      {
        tag: String,
      },
    ],
    regular_price: {
      type: Number,
      trim: true,
      required: true,
    },
    price_sale: {
      type: Number,
      trim: true,
      required: true,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "active",
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("products", productSchema);
