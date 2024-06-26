const { validationResult } = require("express-validator");

const { updateUser } = require("../utilities/update");
const { findUser, findUserInDeliveries } = require("../utilities/find");
const { checkValidation } = require("../utilities/check");
const { createDeliveryInfo } = require("../utilities/create");
const DeliveryInfo = require("../models/deliveries");
const FinanceInfo = require("../models/sellers-finance");

exports.getUserProfile = async (req, res, next) => {
  const { userId } = req;
  try {
    const user = await findUser(userId);

    const deliveryInfo = await DeliveryInfo.findOne({
      customer: userId,
    });
    const financeInfo = await FinanceInfo.findOne({
      seller: userId,
    });
    if (deliveryInfo && financeInfo) {
      res.status(200).json({
        message: "User Found Succesfuly with delivery and finance info",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          city: user.city,
          address: deliveryInfo.address,
          phone: deliveryInfo.phone,
          balance: financeInfo.balance,
        },
      });
    } else if (deliveryInfo) {
      res.status(200).json({
        message: "User Found Succesfuly with delivery info",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          city: user.city,
          address: deliveryInfo.address,
          phone: deliveryInfo.phone,
        },
      });
    } else if (financeInfo) {
      res.status(200).json({
        message: "User Found Succesfuly with finance info",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          city: user.city,
          balance: financeInfo.balance,
        },
      });
    } else {
      res.status(200).json({
        message: "User Found Succesfuly",
        user,
      });
    }
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.editUserProfile = async (req, res, next) => {
  const { username, city, address, phone } = req.body;
  const { userId } = req;

  const errors = validationResult(req);
  try {
    checkValidation(errors);

    let user = await findUser(userId);

    let deliveryInfo;
    if (address || phone) {
      deliveryInfo = await findUserInDeliveries(userId);
      if (!deliveryInfo) {
        deliveryInfo = await createDeliveryInfo(userId, address, phone);
      }
      if (deliveryInfo.address != address) {
        deliveryInfo.address = address;
        await deliveryInfo.save();
      }
      if (deliveryInfo.phone != phone) {
        deliveryInfo.phone = phone;
        await deliveryInfo.save();
      }
    }

    if (user.username != username) {
      user.username = username;
      await user.save();
    }

    if (user.city != city) {
      user = await updateUser(req, user);
    }

    res.status(200).json({
      message: "User Updated Succesfuly",
      user: { ...user._doc, password: undefined },
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
