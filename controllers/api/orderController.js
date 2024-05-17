const Data = require("../../models/product");

const createOrder = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const orderQty = req.body.orderLines[0].orderQty || 1;
    const order = new Data.Order({
      user_id: userId,
      orderLine: [{ product_id: productId, orderQty }],
    });
    await order.save();
    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createOrder };
