const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SahilError = require("../utils/error");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return next(new SahilError("please login to continue ", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      res.clearCookie("token");
      return next(new SahilError("Tokenis not valid! Login to continue", 401));
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.clearCookie("token");
      return next(new SahilError(error.message, 401));
    }
    return next(new SahilError(error.message, 500));
  }
});
