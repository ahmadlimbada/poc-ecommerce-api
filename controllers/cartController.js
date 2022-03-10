const Cart = require("../models/Cart");

//Create User Cart
const addCart = async (req, res) => {
  const newCart = new Cart({ userId: req.user.id, ...req.body });
  try {
    const savedCart = await newCart.save();
    res.status(200).json({ status: 200, success: true, data: savedCart });
  } catch (err) {
    res.status(500).send(err);
  }
};

//Update User Cart
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ status: 200, success: true, data: updatedCart });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete Cart
const deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ status: 200, success: true, data: "Cart Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get User Cart
const getCartDetails = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.status(200).json({ status: 200, success: true, data: cart });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get All Cart Data
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ status: 200, success: true, data: carts });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addCart,
  updateCart,
  deleteCart,
  getAllCarts,
  getCartDetails,
};
