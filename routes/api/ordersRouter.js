const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/api/orderController");

//route Okay !
router.post("/update", orderController.updateOrder);
router.post("/update/:orderId/", orderController.createOrderLine);
router.delete("/update/:orderId/", orderController.deleteOrder);

router.get("/order/:orderId", orderController.getOrder);
//userId passedinto it to get order to reflect cart status
router.get("/getuseOrder/:userId", orderController.getUserOrders);
//get orderIds under the userId
router.get("/:userId/orders", orderController.getUserOrdersById);

// ! Need to think better routes
//create orderline
// router.post("/order/new/:userId", orderController.createOrder);
// router.post("/:orderId/orderLine/:productId", orderController.createOrderLine);
// router.post("/:userId/:productId", orderController.createOrder);
// router.get("/products", productController.productListing);
// router.get("/checkin/", productController.getUserByOrderId);
router.get("/checkout/:orderId", orderController.getUserByOrderId);
router.patch("/:orderId/:userId/paid", orderController.updateOrderPaid);

module.exports = router;
