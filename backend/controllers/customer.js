const { validationResult } = require("express-validator");

const {
  findCustomer,
  findProducts,
  findProduct,
  findUserInDeliveries,
} = require("../utilities/find");
const { updateCart } = require("../utilities/update");
const { createDeliveryInfo } = require("../utilities/create");
const { createSellerFinanceInfo } = require("../utilities/create");

exports.viewProducts = async (req, res, next) => {
  try {
    //const user = await findCustomer(req.userId);
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

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const user = await findCustomer(req.userId);
    const product = await findProduct(productId);

    if (product.availableQuantity == 0) {
      res.status(400).json({
        message: "This product has no available quantity.",
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
  const { address, phone, cardNumber, cardPin } = req.body;
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

    // let financeInfo = await findUserInFinance(userId);
    // if (!financeInfo) {
    //   deliveryInfo = await createCustomerFinanceInfo(
    //     userId,
    //     cardNumber,
    //     cardPin
    //   );
    // }

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

    if (updateCart.length == cartLength) {
      res.status(200).json({
        message:
          "products in your cart are not available for these quantities.",
      });
    } else if (updateCart.length < cartLength) {
      res.status(200).json({
        message:
          "You checkout successfuly but some products in your cart are not available for these quantities.",
      });
    } else if (!updateCart.length) {
      res.status(200).json({
        message: "You checkout successfuly.",
      });
    }
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
