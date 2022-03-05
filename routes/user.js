//get router from express
const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("User test successfull");
});

module.exports = router;
