const { validationResult } = require("express-validator");

const { updateUser } = require("../utilities/update");
const { findUser, findUserInDeliveries } = require("../utilities/find");
const { checkValidation } = require("../utilities/check");
const { createDeliveryInfo } = require("../utilities/create");

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await findUser(req.userId);

    res.status(200).json({
      message: "User Found Succesfuly",
      user: { ...user._doc, password: undefined },
    });
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
