const { Schema, model } = require("mongoose");
const cairoSellersSchema = new Schema(
  {
    username: {
      type: String,
      reqiured: true,
    },
    password: {
      type: String,
      reqiured: true,
    },
    email: {
      type: String,
      reqiured: true,
    },
    city: {
      type: String,
      reqiured: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("CairoSellers", cairoSellersSchema);