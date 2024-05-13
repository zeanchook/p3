var express = require("express");
var router = express.Router();

const productController = require("../../controllers/api/productsController");
const orderController = require("../../controllers/api/productsController");

router.get("/home", productController.index);
router.get("/product/:productId", productController.productDetails);
router.post("/product/new", productController.createProduct);

router.post("/", productController.createUser);
// router.post("/login", usersCtrl.login);

router.get("/order/:orderId", orderController.getOrder);
router.post("/order/new/:userId", orderController.createOrder);
// router.get("/products", productController.productListing);

module.exports = router;
