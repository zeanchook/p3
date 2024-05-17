const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/api/orderController");

//route Okay !
router.post("/update", orderController.updateOrder);
router.post("/update/:orderId/", orderController.createOrderLine);

module.exports = router;
