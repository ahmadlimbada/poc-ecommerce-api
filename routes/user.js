const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserDetails,
  getAllUsers,
  userStats,
} = require("../controllers/UserController");

const {
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("../middleware/auth");

//get router from express
const router = require("express").Router();

//Register
router.post("/register", registerUser);

//Login
router.post("/login", loginUser);

//Update User
router.put("/:id", verifyTokenAndAuthorize, updateUser);

//Delete User
router.delete("/:id", verifyTokenAndAuthorize, deleteUser);

//Get User
router.get("/find/:id", verifyTokenAndAdmin, getUserDetails);

//Get All User
router.get("/", verifyTokenAndAdmin, getAllUsers);

//Get User Stats
router.get("/stats", verifyTokenAndAdmin, userStats);

module.exports = router;
