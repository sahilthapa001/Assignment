const express = require("express");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer");
const userModel = require("../models/User");
const SahilError = require("../utils/error");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const userRouter = express.Router();

userRouter.get(
  "/",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);

      if (!user) {
        return next(new SahilError("user does not exist"), 400);
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new SahilError(error.message, 500));
    }
  })
);

userRouter.post(
  "/create",
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name) {
      return next(new SahilError("Name cannot be empty", 400));
    }
    if (!password) {
      return next(new SahilError("password cannot be emoty", 400));
    }

    const allUsers = await userModel.find({ email });
    const isEmailExists = allUsers.length > 0;

    if (isEmailExists) {
      return next(
        new SahilError("user with provided email already exists", 400)
      );
    }

    const activationToken = createActivationToken({ name, email, password });
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    await sendMail({
      email: email,
      subject: "Please activate your account",
      message: `To activate your account click the link ${activationUrl}`,
    });
    res
      .status(200)
      .json({ success: true, message: "User Activation link sent" });
  })
);

userRouter.get(
  "/activation/:token",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { token } = req.params;
      const { name, email, password } = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const allUsers = await userModel.find({ email });

      const isEmailExists = allUsers.length > 0;
      if (isEmailExists) {
        return next(
          new SahilError("user with the provided email already exists", 401)
        );
      }

      const userCreated = await userModel.create({ name, email, password });
      sendToken(userCreated, 201, res);
    } catch (err) {
      return next(new SahilError(err, 500));
    }
  })
);

module.exports = userRouter;
