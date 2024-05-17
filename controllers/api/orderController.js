const Data = require("../../models/product");

const updateOrder = async (req, res) => {
  try {
    console.log("HELLLLLO");
    console.log("here", req.body);
    await Data.Order.updateOne(
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

    const testing456 = await Data.Order.findOne({
      "orderLine.product_id": req.body.product_id,
      "orderLine._id": req.body._id,
    }).populate({
      path: "orderLine.product_id",
      model: "Product",
    });
    return res.status(201).json(testing456);
    // .json({ message: "Order created successfully", testing123 });
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

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    await Data.Order.updateOne(
      {
        "orderLine.product_id": orderId,
      },
      {
        $pull: {
          orderLine: { product_id: orderId },
        },
      },
    );
    res
      .status(201)
      .json({ message: `Product ID ${orderId} Deleted Successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = { updateOrder, createOrderLine, deleteOrder };
