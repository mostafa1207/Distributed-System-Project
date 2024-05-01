const { Router } = require("express");
const { body } = require("express-validator");

const isAuth = require("../middlewares/is-auth");
const sellerController = require("../controllers/seller");

const router = Router();
router.post(
  "/product",
  isAuth,
  [
    body("name")
      .trim()
      .isLength({ min: 5, max: 50 })
      .isString()
      .withMessage(
        "Please enter a valid product name between 5 and 40 characters"
      ),
    body("description")
      .trim()
      .isString()
      .isLength({ min: 10, max: 200 })
      .withMessage("Enter Description that describes this product"),
    body("price")
      .trim()
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          return false;
        }
        return true;
      })
      .withMessage("Enter price,Only Numbers are accepted"),
    body("availableQuantity")
      .trim()
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          return false;
        }
        return true;
      })
      .withMessage("Enter available Quantity,Only Numbers are accepted"),
    body("category")
      .trim()
      .isString()
      .isLength({ min: 5, max: 60 })
      .withMessage("Enter Category of product"),
  ],
  sellerController.addProduct
);
// router.get("/product/:productId", isAuth, sellerController.viewProduct);
router.delete("/product/:productId", isAuth, sellerController.deleteProduct);
router.put(
  "/product/:productId",
  [
    body("name")
      .trim()
      .isLength({ min: 5, max: 50 })
      .isString()
      .withMessage(
        "Please enter a valid product name between 5 and 40 characters"
      ),
    body("description")
      .trim()
      .isString()
      .isLength({ min: 10, max: 200 })
      .withMessage("Enter Description that describes this product"),
    body("price")
      .trim()
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          return false;
        }
        return true;
      })
      .withMessage("Enter price,Only Numbers are accepted"),
    body("availableQuantity")
      .trim()
      .isNumeric()
      .custom((value) => {
        if (value < 0) {
          return false;
        }
        return true;
      })
      .withMessage("Enter available Quantity,Only Numbers are accepted"),
    body("category")
      .trim()
      .isString()
      .isLength({ min: 5, max: 60 })
      .withMessage("Enter Category of product"),
  ],
  isAuth,
  sellerController.editProduct
);

module.exports = router;
