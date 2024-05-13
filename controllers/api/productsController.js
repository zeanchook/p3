const Data = require("../../models/product")

const index = async(req,res) =>
{try{
  const products = await Data.Product.find({});
  res.status(201).json(products);
}
catch(error){
  console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
}
}

const productDetails = async(req,res) =>
{ try{
    const {productId} = req.params
    const product = await Data.Product.findById(productId)
    // .populate('product');  need to use at orderline
    res.status(201).json(product)
}   catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product' });
}
}

const createProduct = async(req,res) =>
{
    const {title,description,price,picture} = req.body;
    console.log(title,description,price,picture)
    // console.log("body",body)
    try
    {
        const product = await Data.Product.create({title,description,price,picture});
        console.log("product:",product)
        res.status(201).json(product);
    }
    catch(error)
    {
        res.status(401).json({error});
    }
}

const getOrder = async(req,res) =>
{
    const products = await Data.Order.find();
    res.status(201).json(products);
}

const createOrder = async(req,res) =>
{
    const { userId } = req.params;
    try
    {
        const product = await Data.Order.create({});
        product.user_id = userId;
        product.save()
        res.status(201).json(product);
    }
    catch(error)
    {
        res.status(401).json({error});
    }
}

const createUser = async(req,res) =>
{
    const { name,email,address, username,password } = req.body;
    try
    {
        console.log(req.body)
        const user = await Data.User.create( { name,email,address, username,password });
        res.status(201).json(user);
    }
    catch(error)
    {
        res.status(401).json({error});
    }
    
}

module.exports = {
    index,
    productDetails,
    createProduct,
    getOrder,
    createOrder,
    createUser
  };