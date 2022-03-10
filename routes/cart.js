const {
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("../middleware/auth");

const {
  addCart,
  updateCart,
  deleteCart,
  getCartDetails,
  getAllCarts,
} = require("../controllers/CartController");

//get router from express
const router = require("express").Router();

//Create User Cart
router.post("/:id", verifyTokenAndAuthorize, addCart);

//Update User Cart
router.put("/:id", verifyTokenAndAuthorize, updateCart);

//Delete Cart
router.delete("/:id", verifyTokenAndAuthorize, deleteCart);

//Get User Cart
router.get("/find/:id", verifyTokenAndAuthorize, getCartDetails);

//Get All Cart Data
router.get("/get-all", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
