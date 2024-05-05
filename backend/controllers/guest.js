
const {
  findProducts,
  findProduct,
  findSellerUsername,
} = require("../utilities/find");

exports.viewProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    let product = await findProduct(productId);
    const sellerUsername = await findSellerUsername(product.seller);
    res.status(200).json({
      message: "Product Details Fetched Successfuly.",
      product: {
        _id: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        sellerId: product.seller,
        sellerUsername: sellerUsername,
        price: product.price,
        availableQuantity: product.availableQuantity,
        description: product.description,
        category: product.category,
      },
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
    for (let product of products) {
      console.log(product);
      const sellerUsername = await findSellerUsername(product.seller);
      productsWithSellerUsername.push({
        _id: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        sellerId: product.seller,
        sellerUsername: sellerUsername,
        price: product.price,
        availableQuantity: product.availableQuantity,
        description: product.description,
        category: product.category,
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
