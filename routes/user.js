const User = require("../models/User");
const Cart = require("../models/Cart");

const {
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");

//get router from express
const router = require("express").Router();

//Update User
router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ status: 200, success: true, data: updatedUser });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete User
router.delete("/:id", verifyTokenAndAuthorize, async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 200, success: true, data: "User Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ status: 200, success: true, data: others });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All User
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    //const { password, ...others } = user._doc;
    res.status(200).json({ status: 200, success: true, data: users });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.getFullYear() - 1);
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ status: 200, success: true, data });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
