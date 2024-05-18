const express = require("express");
const router = express.Router();
const productController = require("../../controllers/api/productsController");
// const orderController = require("../../controllers/api/orderController");

router.get("/home", productController.index);
router.get("/:productId", productController.productDetails);
// router.get("/product/:productId", productController.productDetails);
router.post("/product/new", productController.createProduct);

module.exports = router;
