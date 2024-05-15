const Data = require("../../models/product");

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
  const products = await Data.Order.find();
  res.status(201).json(products);
};

const createUser = async (req, res) => {
  const { name, email, address, username, password } = req.body;
  try {
    console.log(req.body);
    const user = await Data.User.create({
      name,
      email,
      address,
      username,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const createOrder = async (req, res) => {
  const { userId } = req.params;
  try {
    const product = await Data.Order.create({});
    product.user_id = userId;
    product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const createOrderLine = async (req, res) => {
  const { orderId } = req.params;
  const body = req.body;
  const Order = await Data.Order.findById(orderId);
  // const Order = await Data.Order.find({})
  console.log("Order", Order);
  Order.orderLine.push(body);
  Order.save();

  const newData = await Data.Order.findById({ _id: orderId }).populate({
    path: "orderLine.product_id",
    model: "Product",
  });

  console.log(newData);
  res.status(201).json(newData);
};

const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(userId);
    const User = await Data.Order.find({ user_id: userId });
    res.status(201).json(User);
  } catch (error) {
    res.status(401).json({ error });
  }
};

//get user id and details

const getUserByOrderId = async (req, res) => {
	const { orderId } = req.params;
	try {
		const order = await Data.Order.findById(orderId).populate('user_id');
		if (!order) {
			console.log(`Order not found for orderId: ${orderId}`);
			return res.status(404).json({ message: 'Order not found' });
		}
		console.log(`Order found: ${order}`);
		res.status(200).json(order.user_id);
	} catch (error) {
		console.error(`Error fetching user by order ID: ${error}`);
		res.status(500).json({ message: 'Error fetching user by order ID' });
	}
};

module.exports = {
  index,
  productDetails,
  createProduct,
  getOrder,
  createOrder,
  createUser,
  createOrderLine,
  getUserOrders,
  getUserByOrderId,
};
