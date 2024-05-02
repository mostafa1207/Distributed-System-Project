const { findProducts, findProduct } = require("../utilities/find");

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

    res.status(200).json({
      message: "Products Fetched Successfuly.",
      products,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
