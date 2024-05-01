const { Schema, model } = require("mongoose");
const sellersFinanceSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "AlexSeller" || "CairoSellers",
      reqiured: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    // cardInfo: {
    //   type: Object,
    //   reqiured: true,
    // },
  },
  { timestamps: true }
);
module.exports = model("SellersFinance", sellersFinanceSchema);
