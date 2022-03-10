const router = require("express").Router();

const userRoute = require("./user");
const authRoute = require("./auth");
const productRoute = require("./product");
const cartRoute = require("./cart");
const orderRoute = require("./order");

//use routes
router.use("/api/auth", authRoute);
router.use("/api/users", userRoute);
router.use("/api/products", productRoute);
router.use("/api/carts", cartRoute);
router.use("/api/orders", orderRoute);

module.exports = router;
