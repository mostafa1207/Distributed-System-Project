const CairoSeller = require("../models/cairo-sellers");
const AlexSeller = require("../models/alex-sellers");
const CairoCustomer = require("../models/cairo-customers");
const AlexCustomer = require("../models/alex-customers");
const Product = require("../models/products");

deleteUser = async function (userId, city, userType) {
  let user;
  if (city == "cairo" && userType == "seller") {
    user = await AlexSeller.findByIdAndDelete(userId);
  }
  if (city == "cairo" && userType == "customer") {
    user = await AlexCustomer.findByIdAndDelete(userId);
  }
  if (city == "alex" && userType == "seller") {
    user = await CairoSeller.findByIdAndDelete(userId);
  }
  if (city == "alex" && userType == "customer") {
    user = await CairoCustomer.findByIdAndDelete(userId);
  }
  if (!user) {
    const error = new Error("User Not Found.");
    error.status = 404;
    throw error;
  }
};

deleteProduct = async function (productId) {
  await Product.findByIdAndDelete(productId);
};

module.exports = { deleteUser, deleteProduct };
