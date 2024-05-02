const { validationResult } = require("express-validator");

const { findSeller, findProduct } = require("../utilities/find");
const { deleteProduct } = require("../utilities/delete");
const { checkAuth, checkValidation } = require("../utilities/check");
const { createProduct } = require("../utilities/create");

exports.addProduct = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    checkValidation(errors);
    const user = await findSeller(req.userId);

    // if (!req.file) {
    //   const error = new Error("Please Add An Image File.");
    //   error.status = 422;
    //   throw error;
    // }
    // const imageUrl = req.file.path;

    const result = await createProduct(req);

    res.status(201).json({
      message: "Product Added Successfuly.",
      product: result._doc,
      sellerUsername: user.username,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { userId } = req;
  const { productId } = req.params;

  try {
    const user = await findSeller(userId);
    const product = await findProduct(productId);
    checkAuth(product.seller.toString(), userId);

    await deleteProduct(productId);
    res.status(200).json({
      message: "Product Deleted Successfuly.",
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  const { userId } = req;
  const { productId } = req.params;
  const { name, description, price, availableQuantity, category } = req.body;

  const errors = validationResult(req);
  try {
    //Checking Validation
    checkValidation(errors);

    //Checking Authorization
    const user = await findSeller(userId);

    //Checking if this Product is valid
    const product = await findProduct(productId);

    //Checking if this product is authorized to current seller
    checkAuth(product.seller.toString(), userId);

    //checking that ImageURL field is not empty
    // if (req.file != undefined) {
    //   const imageUrl = req.file.path;
    //   product.imageUrl = imageUrl;
    // }

    //assignning req body to Product attribute
    product.name = name;
    product.description = description;
    product.price = price;
    product.availableQuantity = availableQuantity;
    product.category = category;

    const editedProduct = await product.save();
    res.status(200).json({
      message: "Product Updated Succesfuly",
      product: { ...editedProduct._doc },
      sellerUsername: user.username,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
