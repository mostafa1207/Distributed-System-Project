const { validationResult } = require("express-validator");

const {
  findCustomer,
  findProduct,
  findUserInDeliveries,
  findSellerInFinance,
} = require("../utilities/find");
const { updateCart } = require("../utilities/update");
const { createDeliveryInfo } = require("../utilities/create");
const { createSellerFinanceInfo } = require("../utilities/create");

exports.addToCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = await findCustomer(req.userId);
    const product = await findProduct(productId);

    if (!quantity) {
      res.status(400).json({
        message: "Please add available quantity.",
      });
    }

    if (product.availableQuantity < quantity) {
      res.status(400).json({
        message: `This product has only ${product.availableQuantity}.`,
      });
    } else {
      await updateCart(req, user);

      res.status(200).json({
        message: "Product is added to cart successfuly.",
      });
    }
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.changeQuantity = async (req, res, next) => {
  const errors = validationResult(req);
  const { quantity } = req.body;
  const { productId } = req.params;

  try {
    checkValidation(errors);
    let user = await findCustomer(req.userId);
    let product = user.cart.find((obj) => obj.productId == productId);
    if (!product) {
      res.status(400).json({
        message: "Product is not found in the cart.",
      });
    } else {
      if (quantity == 0) {
        let productIndex = user.cart.findIndex((obj) => obj.productId == productId);
        user.cart.splice(productIndex, 1);
        await user.save();
        res.status(200).json({
          message: "Product removed successfuly.",
          user,
        });
      } else {
        product.quantity = quantity;
        await user.save();
        res.status(200).json({
          message: "Quantity changed successfuly.",
          user,
        });
      }
    }
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.viewCart = async (req, res, next) => {
  try {
    const user = await findCustomer(req.userId);
    //const cart = await findCart(user);

    res.status(200).json({
      message: "Cart Fetched Successfuly.",
      cart: user.cart,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.checkout = async (req, res, next) => {
  const { userId } = req;
  const { address, phone } = req.body;
  const errors = validationResult(req);

  try {
    checkValidation(errors);
    const user = await findCustomer(userId);
    const cartLength = user.cart.length;
    if (!cartLength) {
      res.status(400).json({
        message: "Your cart is empty.",
      });
    }

    let deliveryInfo = await findUserInDeliveries(userId);
    if (!deliveryInfo) {
      deliveryInfo = await createDeliveryInfo(userId, address, phone);
    }

    let updatedCart = [];
    for (const cartProduct of user.cart) {
      const product = await findProduct(cartProduct.productId);
      if (product.availableQuantity >= cartProduct.quantity) {
        const seller = await findSeller(product.seller);
        let sellerFinanceInfo = await findSellerInFinance(product.seller);
        if (!sellerFinanceInfo) {
          sellerFinanceInfo = await createSellerFinanceInfo(product.seller);
        }
        sellerFinanceInfo.balance += Number(
          product.price * cartProduct.quantity
        );
        await sellerFinanceInfo.save();
        product.availableQuantity -= Number(cartProduct.quantity);
        await product.save();
      } else {
        updatedCart.push(cartProduct);
      }
    }
    user.cart = updatedCart;
    await user.save();

    if (!updatedCart.length) {
      res.status(200).json({
        message: "You checkout successfuly.",
      });
    } else if (updatedCart.length == cartLength) {
      res.status(200).json({
        message:
          "products in your cart are not available for these quantities.",
      });
    } else if (updatedCart.length < cartLength) {
      res.status(200).json({
        message:
          "You checkout successfuly but some products in your cart are not available for these quantities.",
      });
    }
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
