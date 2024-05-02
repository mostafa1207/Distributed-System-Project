const { Router } = require("express");
const guestController = require("../controllers/guest");

const router = Router();
router.get("/product/:productId", guestController.viewProduct);
router.get("/products", guestController.viewProducts);

module.exports = router;
