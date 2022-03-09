const Order = require("../models/Order");
const {
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//get router from express
const router = require("express").Router();

//Create User Order
router.post("/:id", verifyTokenAndAuthorize, async (req, res) => {
  const newOrder = new Order({ userId: req.user.id, ...req.body });
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({ status: 200, success: true, data: savedOrder });
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update Order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ status: 200, success: true, data: updatedOrder });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete({ userId: req.user.id });
    res.status(200).json({ status: 200, success: true, data: "Order Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User Orders
router.get("/find/:id", verifyTokenAndAuthorize, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json({ status: 200, success: true, data: orders });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All Cart Data
router.get("/get-all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ status: 200, success: true, data: orders });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Ger Monthly Income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  try {
    const date = new Date();
    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json({ status: 200, success: true, data: income });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
