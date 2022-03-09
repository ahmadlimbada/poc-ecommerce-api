//get router from express
const router = require("express").Router();

const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(201).json({ status: 200, success: true, data: others });
  } catch (err) {
    res.status(500).send(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    //check user exist or not
    !user &&
      res
        .status(401)
        .json({ status: 401, success: false, message: "Wrong Credentials" });
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );

    //check password matches or not
    const originalPasswordString = hashedPassword.toString(CryptoJS.enc.Utf8);
    originalPasswordString !== req.body.password &&
      res
        .status(401)
        .json({ status: 401, success: false, message: "Wrong Credentials" });

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
    const { password, ...others } = user._doc;
    //send if username and passwords are valid
    res
      .status(200)
      .json({ status: 200, success: true, data: { ...others, accessToken } });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
