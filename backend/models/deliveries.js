const { Schema, model } = require("mongoose");
const deliveriesSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "AlexCustomers" || "CairoCustomers",
      reqiured: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = model("deliveries", deliveriesSchema);
