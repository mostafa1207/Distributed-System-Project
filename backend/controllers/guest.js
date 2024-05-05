const Product = require("../models/products");
const { findProduct, findProducts } = require("../utilities/find");

exports.viewProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await findProduct(productId);
    res.status(200).json({
      message: "Product Details Fetched Successfuly.",
      product,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.viewProducts = async (req, res, next) => {
  try {
    const products = await findProducts();
    let productWithSellerUsername = [];
    for (let product of products) {
      product = await Product.findById(product._id).populate(
        "seller",
        "username"
      );
      productWithSellerUsername.push(product);
    }
    res.status(200).json({
      message: "Products Fetched Successfuly.",
      productWithSellerUsername,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
