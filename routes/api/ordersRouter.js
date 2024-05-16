const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/api/orderController");

router.post("/:userId/:productId", orderController.createOrder);

module.exports = router;
