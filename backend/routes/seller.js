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
      .custom((categories) => {
        if (typeof categories === "string") {
          if (categories.length < 5 || categories.length > 60) {
            throw new Error(
              "Please enter a valid category length between 5 and 60 characters"
            );
          }
        } else if (Array.isArray(categories)) {
          for (const category of categories) {
            if (typeof category !== "string") {
              throw new Error("Please enter a valid category type (string)");
            }
            if (category.length < 5 || category.length > 60) {
              throw new Error(
                "Please enter a valid category length between 5 and 60 characters"
              );
            }
          }
        } else {
          throw new Error("Category must be either a string or an array");
        }
        return true;
      })
      .withMessage("Enter valid category for the product"),
  ],
  sellerController.addProduct
);
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
      .custom((categories) => {
        if (typeof categories === "string") {
          if (categories.length < 5 || categories.length > 60) {
            throw new Error(
              "Please enter a valid category length between 5 and 60 characters"
            );
          }
        } else if (Array.isArray(categories)) {
          for (const category of categories) {
            if (typeof category !== "string") {
              throw new Error("Please enter a valid category type (string)");
            }
            if (category.length < 5 || category.length > 60) {
              throw new Error(
                "Please enter a valid category length between 5 and 60 characters"
              );
            }
          }
        } else {
          throw new Error("Category must be either a string or an array");
        }
        return true;
      })
      .withMessage("Enter valid category for the product"),
  ],
  isAuth,
  sellerController.editProduct
);

module.exports = router;
