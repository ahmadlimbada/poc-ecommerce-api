const Order = require("../models/Order");

//Create User Order
const addOrder = async (req, res) => {
  const newOrder = new Order({ userId: req.user.id, ...req.body });
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({ status: 200, success: true, data: savedOrder });
  } catch (err) {
    res.status(500).send(err);
  }
};

//Update Order
const updateOrder = async (req, res) => {
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
};

//Delete Order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete({ userId: req.user.id });
    res.status(200).json({ status: 200, success: true, data: "Order Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get User Orders
const getOrderDetail = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json({ status: 200, success: true, data: orders });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get All Order Data
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ status: 200, success: true, data: orders });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get Monthly Income
const getIncome = async (req, res) => {
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
};

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrderDetail,
  getAllOrders,
  getIncome,
};
