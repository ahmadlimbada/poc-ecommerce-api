//import express
const express = require("express");

//create express object
const app = express();

//import mongoose
const mongoose = require("mongoose");

//import dotenv
const dotenv = require("dotenv");

//import Route
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

//configure dotenv
dotenv.config();

//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Db connection failed:", err);
  });

//USe JSON
app.use(express.json());

//use routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

//listenting to port
app.listen(process.env.API_PORT || 8080, () => {
  console.log("API Running on port 3000");
});
