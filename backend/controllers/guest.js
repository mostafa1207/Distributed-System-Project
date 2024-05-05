const {
  findProducts,
  findProduct,
  findSellerUsername,
} = require("../utilities/find");

exports.viewProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await findProduct(productId);
    const sellerUsername = await findSellerUsername(product.seller);
    res.status(200).json({
      message: "Product Details Fetched Successfuly.",
      product,
      sellerUsername: sellerUsername,
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
    let productsWithSellerUsername = [];
    for (const product of products) {
      const sellerUsername = await findSellerUsername(product.seller);

      productsWithSellerUsername.push({
        product: product,
        sellerUsername: sellerUsername,
      });
    }
    res.status(200).json({
      message: "Products Fetched Successfuly.",
      productsWithSellerUsername,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
