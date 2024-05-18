const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/api/orderController");

router.post("/update", orderController.updateOrder);
router.post("/update/:orderId/", orderController.createOrderLine);
router.delete("/update/:orderId/", orderController.deleteOrder);

router.get("/order/:orderId", orderController.getOrder);
router.get("/getuseOrder/:userId", orderController.getUserOrders);
router.get("/:userId/orders", orderController.getUserOrdersById);
router.get("/checkout/:orderId", orderController.getUserByOrderId);
router.patch("/:orderId/:userId/paid", orderController.updateOrderPaid);

module.exports = router;
