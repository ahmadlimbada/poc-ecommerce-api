const Cart = require("../models/Cart");
const {
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("../middleware/auth");

//get router from express
const router = require("express").Router();

//Create User Cart
router.post("/:id", verifyTokenAndAuthorize, async (req, res) => {
  const newCart = new Cart({ userId: req.user.id, ...req.body });
  try {
    const savedCart = await newCart.save();
    res.status(200).json({ status: 200, success: true, data: savedCart });
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update User Cart
router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {
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
});

//Delete Cart
router.delete("/:id", verifyTokenAndAuthorize, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ status: 200, success: true, data: "Cart Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User Cart
router.get("/find/:id", verifyTokenAndAuthorize, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.status(200).json({ status: 200, success: true, data: cart });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All Cart Data
router.get("/get-all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ status: 200, success: true, data: carts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
