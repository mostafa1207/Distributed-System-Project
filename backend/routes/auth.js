const { Router } = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const { findByEmail } = require("../utilities/find");

const router = Router();
router.post(
  "/signup",
  [
    body("username")
      .trim()
      .isLength({ min: 3, max: 25 })
      .isString()
      .withMessage(
        "please enter a valid username between 5 and 25 characters with no spaces and only numbers and alphabetic characters"
      ),
    body("city")
      .trim()
      .isLength({ min: 3, max: 25 })
      .isAlphanumeric()
      .withMessage(
        "please enter a valid city between 3 and 25 characters with no spaces and only numbers and alphabetic characters"
      ),
    body("userType")
      .trim()
      .toLowerCase()
      .isIn(["seller", "customer"])
      .withMessage("please enter a valid user type either seller or customer"),
    body("password")
      .trim()
      .isString()
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "please enter a valid password that is a string between 5 and 25 characters"
      ),
    body("email")
      .trim()
      .isEmail()
      .withMessage("please enter a valid email")
      .custom(async (value, { req }) => {
        const user = await findByEmail(req.body.email);
        if (user) {
          return Promise.reject("Email Already exists");
        }
        // if (req.body.userType === "seller" && req.body.city === "cairo") {
        //   return CairoSeller.findOne({ email: value }).then((user) => {
        //     if (user) {
        //       return Promise.reject("Email Already exists");
        //     }
        //   });
        // } else if (
        //   req.body.userType === "customer" &&
        //   req.body.city === "cairo"
        // ) {
        //   return CairoCustomer.findOne({ email: value }).then((user) => {
        //     if (user) {
        //       return Promise.reject("Email Already exists");
        //     }
        //   });
        // } else if (req.body.userType === "seller" && req.body.city === "alex") {
        //   return AlexSeller.findOne({ email: value }).then((user) => {
        //     if (user) {
        //       return Promise.reject("Email Already exists");
        //     }
        //   });
        // } else if (
        //   req.body.userType === "customer" &&
        //   req.body.city === "alex"
        // ) {
        //   return AlexCustomer.findOne({ email: value }).then((user) => {
        //     if (user) {
        //       return Promise.reject("Email Already exists");
        //     }
        //   });
        // }
      })
      .normalizeEmail(),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("userType")
      .trim()
      .toLowerCase()
      .isIn(["seller", "customer"])
      .withMessage("please enter a valid user type either seller or customer"),
    body("password")
      .trim()
      .isString()
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "please enter a valid password that is a string between 5 and 25 characters"
      ),
    body("email")
      .trim()
      .isEmail()
      .withMessage("please enter a valid email")
      .normalizeEmail(),
  ],
  authController.login
);

module.exports = router;
