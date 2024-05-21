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

// Increment views and update ranking
const incrementViews = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("productId", productId);
    const product = await Data.findById(productId);
    if (product) {
      product.views += 1;
      product.calculateRanking();
      await product.save();
      res.status(200).send({ message: "Views incremented" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  index,
  productDetails,
  createProduct,
  incrementViews,
};
