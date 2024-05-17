const Data = require("../../models/product");

const updateOrder = async (req, res) => {
  try {
    console.log("HELLLLLO");
    console.log("here", req.body);
    const testing123 = await Data.Order.updateOne(
      {
        "orderLine.product_id": req.body.product_id,
        "orderLine._id": req.body._id,
      },
      {
        $set: {
          "orderLine.$.orderQty": req.body.orderQty,
        },
      },
    );

    return res
      .status(201)
      .json({ message: "Order created successfully", testing123 });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createOrderLine = async (req, res) => {
  const { orderId } = req.params;
  const body = req.body;
  const Order = await Data.Order.findById(orderId);
  Order.orderLine.push(body);
  Order.save();
  const newData = await Data.Order.findById({ _id: orderId }).populate({
    path: "orderLine.product_id",
    model: "Product",
  });
  res.status(201).json(newData);
};

module.exports = { updateOrder, createOrderLine };
