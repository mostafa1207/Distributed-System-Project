const { Router } = require("express");
const { body } = require("express-validator");

const isAuth = require("../middlewares/is-auth");
const customerController = require("../controllers/customer");

const router = Router();
router.put("/cart/:productId", isAuth, customerController.addToCart);
router.put(
  "/changeQuantity/:productId",
  isAuth,
  [
    body("quantity")
      .trim()
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          return false;
        }
        return true;
      })
      .withMessage("Enter available quantity, Only Numbers are accepted"),
  ],
  customerController.changeQuantity
);
router.get("/cart", isAuth, customerController.viewCart);
router.post(
  "/order",
  isAuth,
  [
    body("city")
      .trim()
      .isLength({ min: 3, max: 25 })
      .isAlphanumeric()
      .withMessage(
        "please enter a valid city between 3 and 25 characters with no spaces and only numbers and alphabetic characters"
      ),
    body("address")
      .trim()
      .isLength({ min: 3, max: 100 })
      .isString()
      .withMessage(
        "please enter a valid address that is a string between 3 and 100 characters"
      ),
    body("phone")
      .trim()
      .isString()
      .isLength({ min: 11, max: 11 })
      .withMessage("please enter a valid phone number (11 digits)"),
    body("cardPin")
      .trim()
      .isString()
      .isLength({ min: 4, max: 4 })
      .notEmpty()
      .withMessage("please enter a valid card pin (4 digits)"),
    body("cardNumber")
      .trim()
      .isString()
      .isLength({ min: 16, max: 16 })
      .notEmpty()
      .withMessage("please enter a valid card number (16 digits)"),
  ],
  customerController.checkout
);
router.get('/orders', isAuth, customerController.viewOrders);


module.exports = router;
