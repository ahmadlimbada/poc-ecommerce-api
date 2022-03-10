const {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrderDetail,
  getAllOrders,
  getIncome,
} = require("../controllers/OrderController");

const {
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("../middleware/auth");

//get router from express
const router = require("express").Router();

//Create User Order
router.post("/:id", verifyTokenAndAuthorize, addOrder);

//Update Order
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//Delete Order
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//Get User Orders
router.get("/find/:id", verifyTokenAndAuthorize, getOrderDetail);

//Get All Orders Data
router.get("/get-all", verifyTokenAndAdmin, getAllOrders);

//Get Monthly Income
router.get("/income", verifyTokenAndAdmin, getIncome);

module.exports = router;
