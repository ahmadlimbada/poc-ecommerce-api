const { verifyTokenAndAdmin } = require("../middleware/auth");

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
} = require("../controllers/ProductController");

//get router from express
const router = require("express").Router();

//Create Product
router.post("/", verifyTokenAndAdmin, addProduct);

//Update Product
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//Delete Product
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//Get product by id
router.get("/find/:id", getProductDetails);

//Get All Products
router.get("/", getAllProducts);

module.exports = router;
