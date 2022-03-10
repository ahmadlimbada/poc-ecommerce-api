const Product = require("../models/Product");

//Create Product
const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({ status: 200, success: true, data: savedProduct });
  } catch (err) {
    res.status(500).send(err);
  }
};

//Update Product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ status: 200, success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: 200, success: true, data: "Product Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get product by id
const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ status: 200, success: true, data: product });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get All Products
const getAllProducts = async (req, res) => {
  try {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      products = await Product.find({ categories: { $in: queryCategory } });
    } else {
      products = await Product.find();
    }
    res.status(200).json({ status: 200, success: true, data: products });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
};
