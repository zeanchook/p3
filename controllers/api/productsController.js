const Data = require("../../models/product");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const index = async (req, res) => {
  try {
    const products = await Data.Product.find({});
    res.status(201).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const productDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Data.Product.findById(productId);
    console.log("this");
    // .populate('product');  need to use at orderline
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

const createProduct = async (req, res) => {
  const { title, description, price, picture } = req.body;
  console.log(title, description, price, picture);
  // console.log("body",body)
  try {
    const product = await Data.Product.create({
      title,
      description,
      price,
      picture,
    });
    // console.log("product:",product)
    res.status(201).json(product);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const getOrder = async (req, res) => {
  const products = await Data.Order.find({}).populate({
    path: "orderLine.product_id",
    model: "Product",
  });
  res.status(201).json(products);
};

//user section
const createJWT = (user) =>
  jwt.sign({ user }, process.env.SECRET, { expiresIn: "1h" });

const createUser = async (req, res) => {
  const { name, email, address, username, password, orders } = req.body;
  try {
    const user = await Data.User.create({
      name,
      email,
      address,
      username,
      password,
      orders,
    });
    const token = createJWT(user);
    res.status(201).json(token);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Data.User.findOne({ email });

  if (user === null) {
    res.status(401).json({ msg: "User not found" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  console.log(password, user.password);
  console.log(match);

  if (match) {
    const token = createJWT(user);
    res.json(token);
  } else {
    res.status(401).json({ msg: "Password incorrect" });
  }
};

// const createOrder = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;
//     const orderQty = req.body.orderQty || 1;
//     const order = new Data.Order({
//       user_id: userId,
//       orderLine: [{ product_id: productId, orderQty }],
//     });
//     await order.save();
//     return res
//       .status(201)
//       .json({ message: "Order created successfully", order });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// const createOrder = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const product = await Data.Order.create({});
//     product.user_id = userId;
//     product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(401).json({ error });
//   }
// };

// const createOrderLine = async (req, res) => {
//   const { orderId, productId } = req.params;
//   const body = req.body;
//   const Order = await Data.Order.findById(orderId);
//   // const Order = await Data.Order.find({})
//   console.log("here");
//   console.log("Order", Order);
//   console.log("body is here", body);
//   body.product_id = productId;
//   console.log(body);
//   Order.orderLine.push(body);
//   Order.save();
//   // console.log(Order)

//   const newData = await Data.Order.findById({ _id: orderId }).populate({
//     path: "orderLine.product_id",
//     model: "Product",
//   });

//   console.log(newData);
//   res.status(201).json(newData);
// };

const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  console.log("this", userId);
  try {
    const User = await Data.Order.find({ user_id: userId }).populate({
      path: "orderLine.product_id",
      model: "Product",
    });
    console.log("157", User);

    const findIndex = User.findIndex((items) => items.paidStatus === false);

    if (User.length === 0 || findIndex === -1) {
      const newOrder = await Data.Order.create({});
      newOrder.user_id = userId;
      newOrder.save();
      console.log("here?", newOrder);
      res.status(201).json([newOrder]);
    } else {
      res.status(201).json(User);
    }
    // res.redirect(301, "new-url");
  } catch (error) {
    console.log("here is the err", error);
    res.status(401).json({ error });
  }
};

//get user id and details

const getUserByOrderId = async (req, res) => {
  const { orderId } = req.params;
  console.log("testhere");
  try {
    const order = await Data.Order.findById(orderId).populate("user_id");
    if (!order) {
      console.log(`Order not found for orderId: ${orderId}`);
      return res.status(404).json({ message: "Order not found" });
    }
    console.log(`Order found: ${order}`);
    res.status(200).json(order.user_id);
  } catch (error) {
    console.error(`Error fetching user by order ID: ${error}`);
    res.status(500).json({ message: "Error fetching user by order ID" });
  }
};

//updates the order and user data when place order button is pushed

const updateOrderPaid = async (req, res) => {
  const { orderId, userId } = req.params;
  const updatedData = { paidStatus: true, ...req.body };

  try {
    const updatedOrder = await Data.Order.findByIdAndUpdate(
      orderId,
      updatedData,
      { new: true },
    );
    if (!updatedOrder) {
      return res.status(500).json({ message: "Error updating order" });
    }

    const user = await Data.User.findByIdAndUpdate(
      userId,
      { $addToSet: { orders: orderId } },
      { new: true },
    );

    if (!user) {
      return res.status(500).json({ message: "Error updating user" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order" });
  }
};

const getUserOrdersById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Data.User.findById(userId, "orders");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user orders" });
  }
};

module.exports = {
  index,
  productDetails,
  createProduct,
  getOrder,
  // createOrder,
  createUser,
  // createOrderLine,
  getUserOrders,
  getUserByOrderId,
  userLogin,
  updateOrderPaid,
  getUserOrdersById,
};
