const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("roles", roleSchema);
