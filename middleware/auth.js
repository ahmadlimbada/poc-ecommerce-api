const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let bearerToken = req.headers.token;
  if (bearerToken) {
    bearerToken = bearerToken.split(" ")[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({
          status: 403,
          success: false,
          message: "Invalid Token!",
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "You are not authenticated",
    });
  }
};

const verifyTokenAndAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        status: 403,
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        status: 403,
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
  });
};
module.exports = { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin };
