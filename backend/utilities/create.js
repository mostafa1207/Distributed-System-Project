const CairoSeller = require("../models/cairo-sellers");
const AlexSeller = require("../models/alex-sellers");
const CairoCustomer = require("../models/cairo-customers");
const AlexCustomer = require("../models/alex-customers");
const Product = require("../models/products");
const DeliveryInfo = require("../models/deliveries");
// const CustomerFinanceInfo = require("../models/customers-finance");
const SellerFinanceInfo = require("../models/sellers-finance");
const { getBalance } = require("./balance-lookup-table");

createUser = async function (req, hashedPassword) {
  const { username, email, city, userType } = req.body || req;

  let user;
  if (userType === "seller" && city == "cairo") {
    user = new CairoSeller({
      username,
      password: hashedPassword,
      email,
      city,
    });
  } else if (userType === "seller" && city == "alex") {
    user = new AlexSeller({
      username,
      password: hashedPassword,
      email,
      city,
    });
  } else if (userType === "customer" && city == "cairo") {
    user = new CairoCustomer({
      username,
      password: hashedPassword,
      email,
      city,
    });
  } else if (userType === "customer" && city == "alex") {
    user = new AlexCustomer({
      username,
      password: hashedPassword,
      email,
      city,
    });
  }
  if (!user) {
    const error = new Error("Please Enter A Valid User Type.");
    error.status = 422;
    throw error;
  }
  return await user.save();
};

createUserWithId = async function (req, hashedPassword) {
  const { _id, username, email, city, cart, userType } = req.body || req;

  let user;
  if (userType === "seller" && city == "cairo") {
    user = new CairoSeller({
      _id,
      username,
      password: hashedPassword,
      email,
      city,
      cart,
    });
  } else if (userType === "seller" && city == "alex") {
    user = new AlexSeller({
      _id,
      username,
      password: hashedPassword,
      email,
      city,
      cart,
    });
  } else if (userType === "customer" && city == "cairo") {
    user = new CairoCustomer({
      _id,
      username,
      password: hashedPassword,
      email,
      city,
      cart,
    });
  } else if (userType === "customer" && city == "alex") {
    user = new AlexCustomer({
      _id,
      username,
      password: hashedPassword,
      email,
      city,
      cart,
    });
  }
  if (!user) {
    const error = new Error("Please Enter A Valid User Type.");
    error.status = 422;
    throw error;
  }
  return await user.save();
};

createProduct = async function (req) {
  const { userId } = req;
  const imageUrl = req.file.path;
  const { name, description, price, availableQuantity, category } = req.body;

  const product = new Product({
    name,
    description,
    price,
    availableQuantity,
    category,
    seller: userId,
    imageUrl,
  });
  return await product.save();
};

createDeliveryInfo = async function (userId, address, phone) {
  const deliveryInfo = new DeliveryInfo({ customer: userId, address, phone });
  return await deliveryInfo.save();
};

// createCustomerFinanceInfo = async function (userId, cardNumber, cardPin) {
//   balance = getBalance(cardPin);
//   const customerFinanceInfo = new CustomerFinanceInfo({
//     customer: userId,
//     balance,
//     cardInfo: { cardNumber, cardPin },
//   });
//   return await customerFinanceInfo.save();
// };

createSellerFinanceInfo = async function (userId) {
  const sellerFinanceInfo = new SellerFinanceInfo({
    seller: userId,
  });
  return await sellerFinanceInfo.save();
};

module.exports = {
  createUser,
  createUserWithId,
  createProduct,
  createDeliveryInfo,
  // createCustomerFinanceInfo,
  createSellerFinanceInfo,
};
