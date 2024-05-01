const { Schema, model } = require("mongoose");
const customersFinanceSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "AlexCustomers" || "CairoCustomers",
      reqiured: true,
    },
    // balance: {
    //   type: Number,
    //   default: 0,
    // },
    // cardInfo: {
    //   type: Object,
    //   reqiured: true,
    // },
  },
  { timestamps: true }
);
module.exports = model("CustomersFinance", customersFinanceSchema);
