const mongoose = require("mongoose");
const { Schema } = mongoose;

const imagesSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
    },
    imageURL: String,
    public_id: String,
    position: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("images", imagesSchema);
