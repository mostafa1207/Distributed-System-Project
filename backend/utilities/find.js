const CairoSeller = require("../models/cairo-sellers");
const AlexSeller = require("../models/alex-sellers");
const CairoCustomer = require("../models/cairo-customers");
const AlexCustomer = require("../models/alex-customers");
const Product = require("../models/products");
const DeliveryInfo = require("../models/deliveries");
// const CustomerFinanceInfo = require("../models/customers-finance");
const SellerFinanceInfo = require("../models/sellers-finance");

findUser = async function (userId) {
  let user;
  user = await CairoSeller.findById(userId);
  if (!user) {
    user = await CairoCustomer.findById(userId);
  }
  if (!user) {
    user = await AlexSeller.findById(userId);
  }
  if (!user) {
    user = await AlexCustomer.findById(userId);
  }
  if (!user) {
    const error = new Error("User Not Found.");
    error.status = 404;
    throw error;
  }
  return user;
};

findSeller = async function (userId) {
  let user;
  user = await CairoSeller.findById(userId);
  if (!user) {
    user = await AlexSeller.findById(userId);
  }
  if (!user) {
    const error = new Error("Not Authorized.");
    error.status = 403;
    throw error;
  }
  return user;
};

findCustomer = async function (userId) {
  let user;
  user = await CairoCustomer.findById(userId);
  if (!user) {
    user = await AlexCustomer.findById(userId);
  }
  if (!user) {
    const error = new Error("Not Authorized.");
    error.status = 403;
    throw error;
  }
  return user;
};

findProduct = async function (productId) {
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error("Product Not Found.");
    error.status = 404;
    throw error;
  }
  return product;
};

findProducts = async function () {
  const products = await Product.find();
  return products;
};

findByEmail = async function (email) {
  let user;
  user = await CairoSeller.findOne({ email });
  if (!user) {
    user = await CairoCustomer.findOne({ email });
  }
  if (!user) {
    user = await AlexSeller.findOne({ email });
  }
  if (!user) {
    user = await AlexCustomer.findOne({ email });
  }
  return user;
};

findByEmailAndType = async function (email, userType) {
  let user;
  if (userType == "seller") {
    user = await CairoSeller.findOne({ email });
  }
  if (!user && userType == "customer") {
    user = await CairoCustomer.findOne({ email });
  }
  if (!user && userType == "seller") {
    user = await AlexSeller.findOne({ email });
  }
  if (!user && userType == "customer") {
    user = await AlexCustomer.findOne({ email });
  }
  if (!user) {
    const error = new Error("User With That Email Is Not Found.");
    error.status = 404;
    throw error;
  }
  return user;
};

findUserInDeliveries = async function (userId) {
  return await DeliveryInfo.findOne({ customer: userId });
};

// findUserInFinance = async function (userId) {
//   return await CustomerFinanceInfo.findOne({ customer: userId });
// };

findSellerInFinance = async function (userId) {
  return await SellerFinanceInfo.findOne({ seller: userId });
};

module.exports = {
  findUser,
  findSeller,
  findCustomer,
  findProduct,
  findProducts,
  findByEmail,
  findByEmailAndType,
  findUserInDeliveries,
  SellerFinanceInfo,
};
